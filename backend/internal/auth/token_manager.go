package auth

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenManager struct {
	secret []byte
}

func NewTokenManager(secret string) *TokenManager {
	return &TokenManager{
		secret: []byte(secret),
	}
}

type Claims struct {
	UserID string `json:"uid"`
	jwt.RegisteredClaims
}

//
// =======================
// ACCESS TOKEN
// =======================
//

func (tm *TokenManager) GenerateAccessToken(userID string) (string, error) {
	claims := Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(tm.secret)
}

//
// =======================
// REFRESH TOKEN
// =======================
//

func (tm *TokenManager) GenerateRefreshToken() (string, string, error) {
	raw := generateRandomString(32)

	hash := sha256.Sum256([]byte(raw))
	hashStr := hex.EncodeToString(hash[:])

	return raw, hashStr, nil
}

func (tm *TokenManager) HashRefreshToken(raw string) string {
	h := sha256.Sum256([]byte(raw))
	return base64.RawURLEncoding.EncodeToString(h[:])
}

//
// =======================
// VERIFY ACCESS TOKEN
// =======================
//

func (tm *TokenManager) ParseAccessToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (any, error) {
		return tm.secret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, jwt.ErrTokenInvalidClaims
	}

	return claims, nil
}
