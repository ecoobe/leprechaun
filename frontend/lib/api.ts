// frontend/lib/api.ts

const API_PREFIX = '/api'; // В продакшене всегда так, для разработки можно через прокси next.config.js

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface MessageResponse {
  message: string;
}

// Общая функция для обработки ответов
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // Бэкенд возвращает ошибки в виде plain text
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }
  // Проверяем, есть ли JSON в ответе
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json() as Promise<T>;
  }
  // Если ответ пустой или не JSON, возвращаем пустой объект
  return {} as T;
}

// Запрос кода подтверждения email
export async function requestCode(email: string): Promise<MessageResponse> {
  const res = await fetch(`${API_PREFIX}/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse<MessageResponse>(res);
}

// Регистрация с кодом и паролем
export async function register(email: string, code: string, password: string): Promise<MessageResponse> {
  const res = await fetch(`${API_PREFIX}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, password }),
  });
  return handleResponse<MessageResponse>(res);
}

// Логин (получение токенов)
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_PREFIX}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(res);
}

// Обновление токенов (refresh)
export async function refresh(refreshToken: string): Promise<LoginResponse> {
  const res = await fetch(`${API_PREFIX}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return handleResponse<LoginResponse>(res);
}

// Выход (отзыв refresh токена)
export async function logout(refreshToken: string): Promise<MessageResponse> {
  const res = await fetch(`${API_PREFIX}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return handleResponse<MessageResponse>(res);
}