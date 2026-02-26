package auth

import (
	"context"
	crand "crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	mrand "math/rand"
	"regexp"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo         *Repository
	tokenManager *TokenManager
}

func NewService(repo *Repository, tm *TokenManager) *Service {
	return &Service{
		repo:         repo,
		tokenManager: tm,
	}
}

var emailRegex = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)

// =======================
// REQUEST CODE
// =======================

func (s *Service) RequestCode(ctx context.Context, email string) error {
	email = strings.ToLower(strings.TrimSpace(email))

	if !emailRegex.MatchString(email) {
		return errors.New("invalid email")
	}

	exists, err := s.repo.UserExistsByEmail(ctx, email)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("email already exists")
	}

	code := generateCode()
	expires := time.Now().Add(15 * time.Minute)

	return s.repo.UpsertVerificationToken(ctx, email, code, expires)
}

// =======================
// REGISTER
// =======================

func (s *Service) Register(ctx context.Context, email, code, password string) error {
	email = strings.ToLower(strings.TrimSpace(email))

	storedCode, expires, err := s.repo.GetVerificationToken(ctx, email)
	if err != nil {
		return errors.New("invalid or expired code")
	}

	if time.Now().After(expires) {
		return errors.New("code expired")
	}

	if storedCode != code {
		return errors.New("incorrect code")
	}

	if len(password) < 6 {
		return errors.New("password too short")
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
	email = strings.ToLower(strings.TrimSpace(email))

	user, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		return "", "", errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	); err != nil {
		return "", "", errors.New("invalid credentials")
	}

	// ACCESS — user.ID уже строка (UUID)
	access, err := s.tokenManager.GenerateAccessToken(user.ID)
	if err != nil {
		return "", "", err
	}

	// REFRESH
	rawRefresh, hashRefresh, err := s.tokenManager.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	expires := time.Now().Add(7 * 24 * time.Hour)

	if err := s.repo.CreateRefreshToken(ctx, user.ID, hashRefresh, expires); err != nil {
		return "", "", err
	}

	return access, rawRefresh, nil
}

// =======================
// REFRESH (ROTATION)
// =======================

func (s *Service) Refresh(ctx context.Context, rawRefresh string) (string, string, error) {
	hash := s.tokenManager.HashRefreshToken(rawRefresh)

	userID, expires, err := s.repo.FindRefreshToken(ctx, hash)
	if err != nil {
		return "", "", errors.New("invalid refresh token")
	}

	if time.Now().After(expires) {
		_ = s.repo.DeleteRefreshToken(ctx, hash)
		return "", "", errors.New("refresh token expired")
	}

	// ROTATION — удаляем старый
	if err := s.repo.DeleteRefreshToken(ctx, hash); err != nil {
		return "", "", err
	}

	// новый access — userID уже строка
	access, err := s.tokenManager.GenerateAccessToken(userID)
	if err != nil {
		return "", "", err
	}

	// новый refresh
	newRaw, newHash, err := s.tokenManager.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	newExpires := time.Now().Add(7 * 24 * time.Hour)

	if err := s.repo.CreateRefreshToken(ctx, userID, newHash, newExpires); err != nil {
		return "", "", err
	}

	return access, newRaw, nil
}

// =======================
// UTILS
// =======================

func generateCode() string {
	mrand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%06d", mrand.Intn(1000000))
}

func generateRandomString(n int) string {
	b := make([]byte, n)
	_, _ = crand.Read(b)
	return base64.RawURLEncoding.EncodeToString(b)
}
