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
	ID           string
	Email        string
	PasswordHash string
}

// Identity представляет запись в user_identities
type Identity struct {
	ID             string
	UserID         string
	Provider       string
	ProviderUserID string
	CreatedAt      time.Time
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

// UserExistsByEmail проверяет существование пользователя
func (r *Repository) UserExistsByEmail(ctx context.Context, email string) (bool, error) {
	var exists bool
	err := r.db.QueryRowContext(
		ctx,
		`SELECT EXISTS (SELECT 1 FROM users WHERE email = $1 AND deleted_at IS NULL)`,
		email,
	).Scan(&exists)
	return exists, err
}

// CreateUser создаёт нового пользователя с email
func (r *Repository) CreateUser(ctx context.Context, email, passwordHash string) error {
	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO users (email, password_hash, email_verified) VALUES ($1, $2, TRUE)`,
		email, passwordHash,
	)
	return err
}

// FindUserByEmail возвращает пользователя по email
func (r *Repository) FindUserByEmail(ctx context.Context, email string) (*User, error) {
	var user User
	err := r.db.QueryRowContext(
		ctx,
		`SELECT id, email, password_hash FROM users WHERE email = $1 AND deleted_at IS NULL`,
		email,
	).Scan(&user.ID, &user.Email, &user.PasswordHash)

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
// USER IDENTITIES (OAuth)
// =======================
//

// FindUserByIdentity ищет identity по провайдеру и provider_user_id, возвращает user_id
func (r *Repository) FindUserByIdentity(ctx context.Context, provider, providerUserID string) (string, error) {
	var userID string
	err := r.db.QueryRowContext(ctx,
		`SELECT user_id FROM user_identities WHERE provider = $1 AND provider_user_id = $2`,
		provider, providerUserID,
	).Scan(&userID)
	if errors.Is(err, sql.ErrNoRows) {
		return "", ErrUserNotFound
	}
	return userID, err
}

// CreateUserFromOAuth создаёт нового пользователя из данных OAuth и его identity, возвращает userID
func (r *Repository) CreateUserFromOAuth(ctx context.Context, provider, providerUserID, firstName, lastName, avatarURL string) (string, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	var userID string
	err = tx.QueryRowContext(ctx,
		`INSERT INTO users (first_name, last_name, avatar_url, email_verified) 
		 VALUES ($1, $2, $3, false) RETURNING id`,
		firstName, lastName, avatarURL,
	).Scan(&userID)
	if err != nil {
		return "", err
	}

	_, err = tx.ExecContext(ctx,
		`INSERT INTO user_identities (user_id, provider, provider_user_id) VALUES ($1, $2, $3)`,
		userID, provider, providerUserID,
	)
	if err != nil {
		return "", err
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}
	return userID, nil
}

//
// =======================
// EMAIL VERIFICATION TOKENS
// =======================
//

func (r *Repository) UpsertVerificationToken(ctx context.Context, email, token string, expiresAt time.Time) error {
	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO email_verification_tokens (email, token, expires_at) VALUES ($1, $2, $3)
		 ON CONFLICT (email) DO UPDATE SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at, created_at = NOW()`,
		email, token, expiresAt,
	)
	return err
}

func (r *Repository) GetVerificationToken(ctx context.Context, email string) (string, time.Time, error) {
	var token string
	var expiresAt time.Time
	err := r.db.QueryRowContext(
		ctx,
		`SELECT token, expires_at FROM email_verification_tokens WHERE email = $1`,
		email,
	).Scan(&token, &expiresAt)

	if errors.Is(err, sql.ErrNoRows) {
		return "", time.Time{}, ErrTokenNotFound
	}
	return token, expiresAt, err
}

func (r *Repository) DeleteVerificationToken(ctx context.Context, email string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM email_verification_tokens WHERE email = $1`, email)
	return err
}

//
// =======================
// REFRESH TOKENS
// =======================
//

func (r *Repository) CreateRefreshToken(ctx context.Context, userID, tokenHash string, expiresAt time.Time) error {
	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
		userID, tokenHash, expiresAt,
	)
	return err
}

func (r *Repository) FindRefreshToken(ctx context.Context, tokenHash string) (string, time.Time, error) {
	var userID string
	var expires time.Time
	err := r.db.QueryRowContext(
		ctx,
		`SELECT user_id, expires_at FROM refresh_tokens WHERE token_hash = $1`,
		tokenHash,
	).Scan(&userID, &expires)

	if errors.Is(err, sql.ErrNoRows) {
		return "", time.Time{}, ErrTokenNotFound
	}
	return userID, expires, err
}

func (r *Repository) DeleteRefreshToken(ctx context.Context, tokenHash string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM refresh_tokens WHERE token_hash = $1`, tokenHash)
	return err
}

func (r *Repository) DeleteUserRefreshTokens(ctx context.Context, userID string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM refresh_tokens WHERE user_id = $1`, userID)
	return err
}

func (r *Repository) DeleteExpiredRefreshTokens(ctx context.Context) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM refresh_tokens WHERE expires_at < NOW()`)
	return err
}

func (r *Repository) RotateRefreshToken(
	ctx context.Context,
	oldHash string,
	newHash string,
	newExpires time.Time,
) (string, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	var userID string
	var expires time.Time

	err = tx.QueryRowContext(
		ctx,
		`SELECT user_id, expires_at 
		 FROM refresh_tokens 
		 WHERE token_hash = $1
		 FOR UPDATE`,
		oldHash,
	).Scan(&userID, &expires)

	if errors.Is(err, sql.ErrNoRows) {
		return "", ErrTokenNotFound
	}
	if err != nil {
		return "", err
	}

	if time.Now().After(expires) {
		_, _ = tx.ExecContext(ctx,
			`DELETE FROM refresh_tokens WHERE token_hash = $1`,
			oldHash,
		)
		return "", errors.New("refresh token expired")
	}

	_, err = tx.ExecContext(ctx,
		`DELETE FROM refresh_tokens WHERE token_hash = $1`,
		oldHash,
	)
	if err != nil {
		return "", err
	}

	_, err = tx.ExecContext(ctx,
		`INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
		 VALUES ($1, $2, $3)`,
		userID, newHash, newExpires,
	)
	if err != nil {
		return "", err
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}
	return userID, nil
}
