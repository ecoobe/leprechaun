"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { requestCode, register } from "@/lib/api";

export default function RegisterPage() {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fieldDelays = [0.05, 0.15, 0.25];

  // Валидация email (простая)
  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleRequestCode = async () => {
    if (!email) {
      setError("Введите email");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Некорректный email");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await requestCode(email);
      setSuccess(result.message || "Код отправлен на почту");
      setExpanded(true); // раскрываем остальные поля
    } catch (err: any) {
      setError(err.message || "Ошибка при отправке кода");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !code || !password || !confirmPassword) {
      setError("Все поля обязательны");
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await register(email, code, password);
      setSuccess(result.message || "Регистрация успешна!");
      // Здесь можно перенаправить пользователя, например, на страницу входа:
      // window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (expanded) {
      handleRegister();
    } else {
      handleRequestCode();
    }
  };

  return (
    <>
      {/* Фоновые элементы (без изменений) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <div className="form-card">
          {/* Заголовок с точками (без изменений) */}
          <div className="form-header">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  !expanded ? "dot-gradient" : "bg-emerald-500"
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  expanded ? "dot-gradient" : "bg-zinc-600"
                }`}
              />
            </div>
            <h1 className="form-title">Создать аккаунт</h1>
          </div>

          {/* Блоки ошибок и успеха */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-200 text-sm">
              {success}
            </div>
          )}

          {/* Форма */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <motion.div initial={false} layout>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || expanded} // после раскрытия email уже не меняем
                placeholder="you@example.com"
                className={`form-input ${expanded ? "disabled" : ""}`}
              />
            </motion.div>

            {/* Раскрывающиеся поля */}
            {expanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[0] }}
                >
                  <label className="form-label">Код из письма</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={loading}
                    placeholder="Введите код"
                    className="form-input"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[1] }}
                >
                  <label className="form-label">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Введите пароль"
                    className="form-input"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[2] }}
                >
                  <label className="form-label">Подтвердите пароль</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Повторите пароль"
                    className="form-input"
                  />
                </motion.div>
              </>
            )}

            {/* Кнопка */}
            <motion.div layout transition={{ duration: 0.45, ease: "easeInOut" }}>
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full rounded-full py-3"
                disabled={loading}
              >
                {loading
                  ? "Загрузка..."
                  : expanded
                  ? "Сохранить"
                  : "Получить код"}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}