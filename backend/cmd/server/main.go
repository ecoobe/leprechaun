package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/count", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "42")
	})

	fmt.Println("Backend запущен на :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
