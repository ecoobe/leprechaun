package app

import (
	"database/sql"
	"log"
	"net/http"

	"leprechaun/internal/auth"
	"leprechaun/internal/config"
	"leprechaun/internal/db"
	httpHandler "leprechaun/internal/handlers/http"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type App struct {
	Server *http.Server
	DB     *sql.DB
}

func New() (*App, error) {
	cfg := config.Load()

	// --- DB ---
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

	// --- Router ---
	mux := http.NewServeMux()

	// Health
	healthHandler := httpHandler.NewHealthHandler(dbpool)
	mux.HandleFunc("/health", healthHandler)

	// Prometheus
	mux.Handle("/metrics", promhttp.Handler())

	// --- Auth wiring ---
	authRepo := auth.NewRepository(dbpool)
	authService := auth.NewService(authRepo)
	authHandler := httpHandler.NewAuthHandler(authService)

	mux.HandleFunc("/auth/request-code", authHandler.RequestCode)
	mux.HandleFunc("/auth/register", authHandler.Register)

	// --- Server ---
	server := &http.Server{
		Addr:    ":" + cfg.AppPort,
		Handler: mux,
	}

	log.Println("Application initialized")

	return &App{
		Server: server,
		DB:     dbpool,
	}, nil
}
