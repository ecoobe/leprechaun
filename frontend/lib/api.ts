const API_PREFIX = '/api'; // В продакшене всегда так, для разработки можно через прокси next.config.js

export async function requestCode(email: string): Promise<{ message: string }> {
  const res = await fetch(`${API_PREFIX}/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    // Бэкенд возвращает ошибку plain text (например, "email is required")
    const error = await res.text();
    throw new Error(error || 'Failed to request code');
  }

  return res.json();
}

export async function register(email: string, code: string, password: string): Promise<{ message: string }> {
  const res = await fetch(`${API_PREFIX}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, password }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Registration failed');
  }

  return res.json();
}