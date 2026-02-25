package auth

type RequestCodeRequest struct {
	Email string `json:"email"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Code     string `json:"code"`
	Password string `json:"password"`
}
