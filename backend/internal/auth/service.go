package auth

import (
	"context"
	"crypto/rand"
	"errors"
	"math/big"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// TokenProvider определяет интерфейс для работы с токенами.
type TokenProvider interface {
	GenerateAccessToken(userID string) (string, error)
	GenerateRefreshToken() (string, error)
	HashRefreshToken(raw string) string
}

type Service struct {
	repo         *Repository
	tokenManager TokenProvider
}

func NewService(repo *Repository, tm TokenProvider) *Service {
	return &Service{
		repo:         repo,
		tokenManager: tm,
	}
}

// =======================
// Генерация кода подтверждения (crypto‑secure)
// =======================
func generateCode() string {
	const digits = "0123456789"
	code := make([]byte, 6)
	for i := range code {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(digits))))
		code[i] = digits[n.Int64()]
	}
	return string(code)
}

// =======================
// REQUEST CODE
// =======================
func (s *Service) RequestCode(ctx context.Context, email string) error {
	email = normalizeEmail(email)

	exists, err := s.repo.UserExistsByEmail(ctx, email)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("email already exists")
	}
	code := generateCode()
	expires := time.Now().Add(10 * time.Minute)
	return s.repo.UpsertVerificationToken(ctx, email, code, expires)
}

// =======================
// REGISTER
// =======================
func (s *Service) Register(ctx context.Context, email, password, code string) error {
	email = normalizeEmail(email)

	storedCode, expiresAt, err := s.repo.GetVerificationToken(ctx, email)
	if err != nil {
		return err
	}
	if time.Now().After(expiresAt) {
		return errors.New("verification code expired")
	}
	if storedCode != code {
		return errors.New("invalid verification code")
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	if err := s.repo.CreateUser(ctx, email, string(hash)); err != nil {
		return err
	}
	return s.repo.DeleteVerificationToken(ctx, email)
}

// =======================
// LOGIN
// =======================
func (s *Service) Login(ctx context.Context, email, password string) (string, string, error) {
	email = normalizeEmail(email)

	user, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		// Защита от timing‑атаки
		_ = bcrypt.CompareHashAndPassword(
			[]byte("$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinv"),
			[]byte(password),
		)
		return "", "", errors.New("invalid credentials")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return "", "", errors.New("invalid credentials")
	}
	access, err := s.tokenManager.GenerateAccessToken(user.ID)
	if err != nil {
		return "", "", err
	}
	refresh, err := s.tokenManager.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}
	hashRefresh := s.tokenManager.HashRefreshToken(refresh)
	expires := time.Now().Add(7 * 24 * time.Hour)
	if err := s.repo.CreateRefreshToken(ctx, user.ID, hashRefresh, expires); err != nil {
		return "", "", err
	}
	return access, refresh, nil
}

// =======================
// REFRESH (ROTATION)
// =======================
func (s *Service) Refresh(ctx context.Context, refreshToken string) (string, string, error) {
	oldHash := s.tokenManager.HashRefreshToken(refreshToken)

	newRefresh, err := s.tokenManager.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	newHash := s.tokenManager.HashRefreshToken(newRefresh)
	newExpires := time.Now().Add(7 * 24 * time.Hour)

	userID, err := s.repo.RotateRefreshToken(
		ctx,
		oldHash,
		newHash,
		newExpires,
	)
	if err != nil {
		return "", "", errors.New("invalid refresh token")
	}

	access, err := s.tokenManager.GenerateAccessToken(userID)
	if err != nil {
		return "", "", err
	}

	return access, newRefresh, nil
}

// =======================
// LOGOUT (single session)
// =======================
func (s *Service) Logout(ctx context.Context, refreshToken string) error {
	hash := s.tokenManager.HashRefreshToken(refreshToken)
	return s.repo.DeleteRefreshToken(ctx, hash)
}

// =======================
// LOGOUT ALL DEVICES
// =======================
func (s *Service) LogoutAll(ctx context.Context, userID string) error {
	return s.repo.DeleteUserRefreshTokens(ctx, userID)
}

// =======================
// CLEANUP EXPIRED TOKENS (вызывать по cron)
// =======================
func (s *Service) CleanupExpiredTokens(ctx context.Context) error {
	return s.repo.DeleteExpiredRefreshTokens(ctx)
}

// UTILS
func normalizeEmail(email string) string {
	return strings.ToLower(strings.TrimSpace(email))
}
