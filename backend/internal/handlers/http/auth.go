package http

import (
	"encoding/json"
	"log"
	"net/http"
	"net/mail"
	"strings"

	"leprechaun/internal/auth"
	"leprechaun/internal/metrics"
)

type AuthHandler struct {
	service *auth.Service
}

func NewAuthHandler(service *auth.Service) *AuthHandler {
	return &AuthHandler{service: service}
}

// isValidEmail проверяет корректность формата email
func isValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func (h *AuthHandler) RequestCode(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	defer r.Body.Close()

	var req auth.RequestCodeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	if req.Email == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}
	if !isValidEmail(req.Email) {
		http.Error(w, "invalid email format", http.StatusBadRequest)
		return
	}

	if err := h.service.RequestCode(r.Context(), req.Email); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"message": "verification code sent"})
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	defer r.Body.Close()

	var req auth.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	if req.Email == "" || req.Code == "" || req.Password == "" {
		http.Error(w, "all fields are required", http.StatusBadRequest)
		return
	}
	if !isValidEmail(req.Email) {
		http.Error(w, "invalid email format", http.StatusBadRequest)
		return
	}
	if len(req.Password) < 6 {
		http.Error(w, "password too short", http.StatusBadRequest)
		return
	}

	// Порядок: email, password, code
	if err := h.service.Register(r.Context(), req.Email, req.Password, req.Code); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"message": "registration successful"})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	if req.Email == "" || req.Password == "" {
		http.Error(w, "email and password are required", http.StatusBadRequest)
		return
	}
	if !isValidEmail(req.Email) {
		http.Error(w, "invalid email format", http.StatusBadRequest)
		return
	}

	access, refresh, err := h.service.Login(r.Context(), req.Email, req.Password)
	if err != nil {
		// Увеличиваем счетчик неудачных попыток входа
		metrics.LoginFailures.WithLabelValues(req.Email).Inc()
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Успешная аутентификация
	metrics.AuthSuccess.Inc()

	writeJSON(w, http.StatusOK, map[string]string{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	type request struct {
		RefreshToken string `json:"refresh_token"`
	}

	var req request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	access, refresh, err := h.service.Refresh(r.Context(), req.RefreshToken)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Обновление токена также считается успешной аутентификацией (опционально)
	metrics.AuthSuccess.Inc()

	writeJSON(w, http.StatusOK, map[string]string{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

// Logout обрабатывает выход пользователя
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		RefreshToken string `json:"refresh_token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}
	if req.RefreshToken == "" {
		http.Error(w, "refresh_token is required", http.StatusBadRequest)
		return
	}

	// Вызываем сервис для отзыва токена
	if err := h.service.Logout(r.Context(), req.RefreshToken); err != nil {
		// Логируем ошибку, но клиенту всегда отвечаем успехом
		log.Printf("Logout error: %v", err)
	}

	writeJSON(w, http.StatusOK, map[string]string{"message": "logged out successfully"})
}

// TelegramAuth обрабатывает авторизацию через Telegram Login Widget.
func (h *AuthHandler) TelegramAuth(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	defer r.Body.Close()

	var data map[string]string
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	access, refresh, err := h.service.TelegramLogin(r.Context(), data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

// TelegramRedirect обрабатывает редирект от Telegram Login Widget.
func (h *AuthHandler) TelegramRedirect(w http.ResponseWriter, r *http.Request) {
	// 1. Собираем все параметры из запроса в map
	data := make(map[string]string)
	for key, values := range r.URL.Query() {
		if len(values) > 0 {
			data[key] = values[0]
		}
	}

	// 2. Проверяем наличие обязательных полей
	if _, ok := data["id"]; !ok {
		http.Error(w, "missing telegram id", http.StatusBadRequest)
		return
	}

	// 3. Вызываем тот же метод сервиса, что и для колбэка
	access, refresh, err := h.service.TelegramLogin(r.Context(), data)
	if err != nil {
		// В случае ошибки можно редиректить на страницу логина с параметром ошибки
		http.Redirect(w, r, "/login?error=telegram_auth_failed", http.StatusFound)
		return
	}

	// 4. Успех — редиректим на фронтенд с токенами (или устанавливаем куки)
	// Вариант А: редирект с токенами в query (менее безопасно, но просто)
	// http.Redirect(w, r, fmt.Sprintf("/dashboard?access_token=%s&refresh_token=%s", access, refresh), http.StatusFound)

	// Вариант Б: устанавливаем токены в httpOnly куки (безопаснее)
	http.SetCookie(w, &http.Cookie{
		Name:     "access_token",
		Value:    access,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   900, // 15 минут
	})
	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    refresh,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   604800, // 7 дней
	})
	http.Redirect(w, r, "/dashboard", http.StatusFound)
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}
