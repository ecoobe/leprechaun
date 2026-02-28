package middleware

import (
	"net/http"
	"strconv"

	"leprechaun/internal/metrics"
)

func MetricsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/metrics" {
			next.ServeHTTP(w, r)
			return
		}

		rw := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}
		next.ServeHTTP(rw, r)

		metrics.HTTPRequests.WithLabelValues(
			r.Method,
			normalizePath(r.URL.Path),
			strconv.Itoa(rw.statusCode),
		).Inc()
	})
}

func normalizePath(path string) string {
	// Здесь можно добавить замену числовых ID на шаблоны
	return path
}
