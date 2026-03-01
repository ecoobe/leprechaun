package telegram

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"sort"
	"strings"
)

// Validate проверяет данные от Telegram Login Widget.
// data — мапа с полями от виджета (включая hash)
// token — токен бота
func Validate(data map[string]string, token string) bool {
	// Проверка auth_date (не старше суток) — рекомендуется добавить
	// authDateStr, ok := data["auth_date"]
	// if !ok { return false }
	// ...

	// Сортируем ключи, исключая hash
	var keys []string
	for k := range data {
		if k == "hash" {
			continue
		}
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var checkStrings []string
	for _, k := range keys {
		checkStrings = append(checkStrings, k+"="+data[k])
	}
	checkString := strings.Join(checkStrings, "\n")

	// secret_key = SHA256(token)
	secret := sha256.Sum256([]byte(token))

	// HMAC-SHA-256 от checkString с secret
	h := hmac.New(sha256.New, secret[:])
	h.Write([]byte(checkString))
	calculatedHash := hex.EncodeToString(h.Sum(nil))

	return calculatedHash == data["hash"]
}
