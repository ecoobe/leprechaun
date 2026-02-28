package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
)

var (
	LoginFailures = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "login_failures_total",
			Help: "Total number of failed login attempts",
		},
		[]string{"email"},
	)

	AuthSuccess = prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "auth_success_total",
			Help: "Total number of successful authentications",
		},
	)

	RateLimitHits = prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "rate_limit_hits_total",
			Help: "Total number of rate limit rejections",
		},
	)

	HTTPRequests = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total_custom",
			Help: "Total number of HTTP requests",
		},
		[]string{"method", "path", "status"},
	)
)

func Init() {
	prometheus.MustRegister(
		LoginFailures,
		AuthSuccess,
		RateLimitHits,
		HTTPRequests,
	)
}
