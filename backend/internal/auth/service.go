package auth

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"regexp"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
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
// UTILS
// =======================

func generateCode() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%06d", rand.Intn(1000000))
}
