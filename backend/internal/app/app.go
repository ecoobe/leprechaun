package app

import (
	"database/sql"
	"log"
	"net/http"
	"time"

	"leprechaun/internal/auth"
	"leprechaun/internal/config"
	"leprechaun/internal/db"
	httpHandler "leprechaun/internal/handlers/http"
	"leprechaun/internal/metrics"
	"leprechaun/internal/middleware"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type App struct {
	Server *http.Server
	DB     *sql.DB
}

func New() (*App, error) {
	cfg := config.Load()

	// Metrics
	metrics.Init()

	// =========================
	// DB
	// =========================
	dbpool, err := db.NewPostgres(db.Config{
		Host:     cfg.DBHost,
		Port:     cfg.DBPort,
		User:     cfg.DBUser,
		Password: cfg.DBPassword,
		Name:     cfg.DBName,
	})
	if err != nil {
		return nil, err
	}

	// =========================
	// Middleware
	// =========================
	loginLimiter := middleware.NewRateLimiter(5, time.Minute)

	// =========================
	// Router
	// =========================
	mux := http.NewServeMux()

	// --- Health ---
	healthHandler := httpHandler.NewHealthHandler(dbpool)
	mux.HandleFunc("/health", healthHandler)

	// --- Prometheus ---
	mux.Handle("/metrics", promhttp.Handler())

	// =========================
	// Auth wiring
	// =========================
	authRepo := auth.NewRepository(dbpool)
	tokenManager := auth.NewTokenManager(cfg.JWTSecret)

	// Передаём токен бота (может быть пустым, если не настроен)
	authService := auth.NewService(authRepo, tokenManager, cfg.TelegramBotToken)
	authHandler := httpHandler.NewAuthHandler(authService)

	// --- Public routes ---
	mux.HandleFunc("/auth/request-code", authHandler.RequestCode)
	mux.HandleFunc("/auth/register", authHandler.Register)
	mux.HandleFunc("/auth/refresh", authHandler.Refresh)

	// --- Telegram auth (публичный) ---
	mux.HandleFunc("/auth/telegram", authHandler.TelegramAuth)
	mux.HandleFunc("/auth/telegram-redirect", authHandler.TelegramRedirect) // новый

	// --- Login с rate limit ---
	mux.Handle(
		"/auth/login",
		loginLimiter.Middleware(
			http.HandlerFunc(authHandler.Login),
		),
	)

	// --- Protected routes ---
	mux.Handle(
		"/auth/logout",
		auth.AuthMiddleware(tokenManager)(
			http.HandlerFunc(authHandler.Logout),
		),
	)

	// Пример защищённого endpoint
	mux.Handle(
		"/me",
		auth.AuthMiddleware(tokenManager)(
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				userID, ok := auth.GetUserID(r.Context())
				if !ok {
					http.Error(w, "unauthorized", http.StatusUnauthorized)
					return
				}

				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusOK)
				w.Write([]byte(`{"user_id":"` + userID + `"}`))
			}),
		),
	)

	// =========================
	// Global middleware chain
	// =========================
	var handler http.Handler = mux

	// Порядок важен:
	// Сначала Logging
	handler = middleware.Logging(handler)

	// Потом RequestID
	handler = middleware.RequestID(handler)

	// Потом MetricsMiddleware
	handler = middleware.MetricsMiddleware(handler)

	// =========================
	// Server
	// =========================
	server := &http.Server{
		Addr:    ":" + cfg.AppPort,
		Handler: handler,
	}

	log.Println("Application initialized")

	return &App{
		Server: server,
		DB:     dbpool,
	}, nil
}
