package auth

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// Проверка существования пользователя
func (r *Repository) UserExistsByEmail(ctx context.Context, email string) (bool, error) {
	var exists bool
	err := r.db.QueryRowContext(
		ctx,
		`SELECT EXISTS (
			SELECT 1 FROM users
			WHERE email = $1 AND deleted_at IS NULL
		)`,
		email,
	).Scan(&exists)

	return exists, err
}

// Создание пользователя
func (r *Repository) CreateUser(ctx context.Context, email, passwordHash string) error {
	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO users (email, password_hash, email_verified)
		 VALUES ($1, $2, true)`,
		email,
		passwordHash,
	)
	return err
}

// Сохранение или обновление verification кода
func (r *Repository) UpsertVerificationToken(ctx context.Context, email, token string, expires time.Time) error {
	_, err := r.db.ExecContext(
		ctx,
		`
		INSERT INTO email_verification_tokens (email, token, expires_at)
		VALUES ($1, $2, $3)
		ON CONFLICT (email)
		DO UPDATE SET
			token = EXCLUDED.token,
			expires_at = EXCLUDED.expires_at,
			created_at = NOW()
		`,
		email,
		token,
		expires,
	)
	return err
}

// Получить токен
func (r *Repository) GetVerificationToken(ctx context.Context, email string) (string, time.Time, error) {
	var token string
	var expires time.Time

	err := r.db.QueryRowContext(
		ctx,
		`SELECT token, expires_at
		 FROM email_verification_tokens
		 WHERE email = $1`,
		email,
	).Scan(&token, &expires)

	if errors.Is(err, sql.ErrNoRows) {
		return "", time.Time{}, errors.New("token not found")
	}

	return token, expires, err
}

// Удалить токен после успешной регистрации
func (r *Repository) DeleteVerificationToken(ctx context.Context, email string) error {
	_, err := r.db.ExecContext(
		ctx,
		`DELETE FROM email_verification_tokens WHERE email = $1`,
		email,
	)
	return err
}
