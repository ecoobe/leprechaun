package auth

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrTokenNotFound     = errors.New("verification token not found")
	ErrUserAlreadyExists = errors.New("user already exists")
)

// =======================
// USER MODEL
// =======================

type User struct {
	ID           int64
	Email        string
	PasswordHash string
}

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

//
// =======================
// USERS
// =======================
//

// Проверка существования пользователя
func (r *Repository) UserExistsByEmail(ctx context.Context, email string) (bool, error) {
	var exists bool

	err := r.db.QueryRowContext(
		ctx,
		`
		SELECT EXISTS (
			SELECT 1
			FROM users
			WHERE email = $1
			  AND deleted_at IS NULL
		)
		`,
		email,
	).Scan(&exists)

	if err != nil {
		return false, err
	}

	return exists, nil
}

// Создание пользователя
func (r *Repository) CreateUser(ctx context.Context, email, passwordHash string) error {
	_, err := r.db.ExecContext(
		ctx,
		`
		INSERT INTO users (email, password_hash, email_verified)
		VALUES ($1, $2, TRUE)
		`,
		email,
		passwordHash,
	)

	return err
}

// Получить пользователя по email
func (r *Repository) FindUserByEmail(ctx context.Context, email string) (*User, error) {
	query := `
		SELECT id, email, password_hash
		FROM users
		WHERE email = $1
		  AND deleted_at IS NULL
	`

	var user User

	err := r.db.QueryRowContext(ctx, query, email).
		Scan(&user.ID, &user.Email, &user.PasswordHash)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrUserNotFound
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

//
// =======================
// EMAIL VERIFICATION TOKENS
// =======================
//

func (r *Repository) UpsertVerificationToken(
	ctx context.Context,
	email,
	token string,
	expiresAt time.Time,
) error {

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
		expiresAt,
	)

	return err
}

func (r *Repository) GetVerificationToken(
	ctx context.Context,
	email string,
) (string, time.Time, error) {

	var token string
	var expiresAt time.Time

	err := r.db.QueryRowContext(
		ctx,
		`
		SELECT token, expires_at
		FROM email_verification_tokens
		WHERE email = $1
		`,
		email,
	).Scan(&token, &expiresAt)

	if errors.Is(err, sql.ErrNoRows) {
		return "", time.Time{}, ErrTokenNotFound
	}

	if err != nil {
		return "", time.Time{}, err
	}

	return token, expiresAt, nil
}

func (r *Repository) DeleteVerificationToken(
	ctx context.Context,
	email string,
) error {

	_, err := r.db.ExecContext(
		ctx,
		`
		DELETE FROM email_verification_tokens
		WHERE email = $1
		`,
		email,
	)

	return err
}

//
// =======================
// REFRESH TOKENS
// =======================
//

func (r *Repository) CreateRefreshToken(
	ctx context.Context,
	userID int64,
	tokenHash string,
	expiresAt time.Time,
) error {

	query := `
		INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
		VALUES ($1, $2, $3)
	`

	_, err := r.db.ExecContext(ctx, query, userID, tokenHash, expiresAt)
	return err
}

func (r *Repository) FindRefreshToken(
	ctx context.Context,
	tokenHash string,
) (int64, time.Time, error) {

	query := `
		SELECT user_id, expires_at
		FROM refresh_tokens
		WHERE token_hash = $1
	`

	var userID int64
	var expires time.Time

	err := r.db.QueryRowContext(ctx, query, tokenHash).
		Scan(&userID, &expires)

	if errors.Is(err, sql.ErrNoRows) {
		return 0, time.Time{}, ErrTokenNotFound
	}

	if err != nil {
		return 0, time.Time{}, err
	}

	return userID, expires, nil
}

func (r *Repository) DeleteRefreshToken(
	ctx context.Context,
	tokenHash string,
) error {

	query := `
		DELETE FROM refresh_tokens
		WHERE token_hash = $1
	`

	_, err := r.db.ExecContext(ctx, query, tokenHash)
	return err
}

func (r *Repository) DeleteUserRefreshTokens(
	ctx context.Context,
	userID int64,
) error {

	query := `
		DELETE FROM refresh_tokens
		WHERE user_id = $1
	`

	_, err := r.db.ExecContext(ctx, query, userID)
	return err
}
