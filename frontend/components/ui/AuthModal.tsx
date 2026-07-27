"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { login, register, requestCode } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setMode("login");
      setEmail("");
      setCode("");
      setPassword("");
      setConfirmPassword("");
      setStep(false);
      setLoading(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  async function handleLogin() {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await login(email, password);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  async function handleRequestCode() {
    if (!email) {
      setError("Введите Email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await requestCode(email);

      setStep(true);
    } catch (err: any) {
      setError(err.message || "Не удалось отправить код");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!email || !code || !password || !confirmPassword) {
      setError("Заполните все поля");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register(email, code, password);

      await handleLogin();
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="panel w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
        >
          <header className="mb-7">
            <h2 className="text-xl font-medium">
              {mode === "login" ? "Войти" : "Создать аккаунт"}
            </h2>

            <p className="text-muted mt-2">
              {mode === "login"
                ? "Введите данные вашего аккаунта"
                : "Регистрация нового пользователя"}
            </p>
          </header>

          {error && (
            <div className="alert-error mb-5">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <input
              className="input"
              placeholder="Email"
              value={email}
              disabled={loading || (mode === "register" && step)}
              onChange={(e) => setEmail(e.target.value)}
            />

            {mode === "register" && step && (
              <input
                className="input"
                placeholder="Код подтверждения"
                value={code}
                disabled={loading}
                onChange={(e) => setCode(e.target.value)}
              />
            )}

            {(mode === "login" || step) && (
              <>
                <input
                  className="input"
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {mode === "register" && (
                  <input
                    className="input"
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    disabled={loading}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}
              </>
            )}

            <Button
              className="w-full"
              disabled={loading}
              onClick={
                mode === "login"
                  ? handleLogin
                  : step
                  ? handleRegister
                  : handleRequestCode
              }
            >
              {loading
                ? "Загрузка..."
                : mode === "login"
                ? "Войти"
                : step
                ? "Создать аккаунт"
                : "Получить код"}
            </Button>
          </div>

          <footer className="mt-7 text-center text-sm">
            {mode === "login" ? (
              <>
                <span className="text-muted">
                  Нет аккаунта?{" "}
                </span>

                <button
                  className="link"
                  onClick={() => {
                    setMode("register");
                    setStep(false);
                    setError("");
                  }}
                >
                  Регистрация
                </button>
              </>
            ) : (
              <>
                <span className="text-muted">
                  Уже есть аккаунт?{" "}
                </span>

                <button
                  className="link"
                  onClick={() => {
                    setMode("login");
                    setStep(false);
                    setError("");
                  }}
                >
                  Войти
                </button>
              </>
            )}
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}