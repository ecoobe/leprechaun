package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq"
)

type Config struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

func NewPostgres(cfg Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.Host,
		cfg.Port,
		cfg.User,
		cfg.Password,
		cfg.Name,
	)

	var db *sql.DB
	var err error

	maxAttempts := 10
	retryDelay := 3 * time.Second

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		db, err = sql.Open("postgres", dsn)
		if err != nil {
			log.Printf("DB open error (attempt %d/%d): %v", attempt, maxAttempts, err)
			time.Sleep(retryDelay)
			continue
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		err = db.PingContext(ctx)
		cancel()

		if err == nil {
			log.Println("Successfully connected to PostgreSQL")
			return db, nil
		}

		log.Printf("DB ping failed (attempt %d/%d): %v", attempt, maxAttempts, err)
		time.Sleep(retryDelay)
	}

	return nil, fmt.Errorf("could not connect to database after %d attempts: %w", maxAttempts, err)
}
