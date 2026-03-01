"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import Link from "next/link";
import { login, telegramLogin, type TelegramUser } from "@/lib/api";
import { TelegramLoginButton } from "@/components/ui/TelegramLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramAuth = async (user: TelegramUser) => {
    setLoading(true);
    setError("");
    try {
      const data = await telegramLogin(user);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Ошибка входа через Telegram");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Войти в аккаунт</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <motion.form
            layout
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <motion.div layout>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="you@example.com"
                className={`form-input ${loading ? "opacity-50" : ""}`}
                required
              />
            </motion.div>

            <motion.div layout>
              <label className="form-label">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Введите пароль"
                className={`form-input ${loading ? "opacity-50" : ""}`}
                required
              />
            </motion.div>

            <motion.div layout>
              <Button
                type="submit"
                variant="primary"
                className="w-full rounded-full py-3"
                disabled={loading}
              >
                {loading ? "Вход..." : "Войти"}
              </Button>
            </motion.div>
          </motion.form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-muted-foreground">или</span>
            </div>
          </div>

          <TelegramLoginButton
  				botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME!}
  				className="w-full"
		  />

          <div className="text-center mt-6 form-text-muted space-y-1">
            <div>
              <span
                className="form-link cursor-pointer"
                onClick={() => alert("Форма восстановления пароля пока не реализована")}
              >
                Забыл пароль?
              </span>
            </div>
            <div>
              Впервые у нас?{" "}
              <Link href="/register" className="form-link">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}