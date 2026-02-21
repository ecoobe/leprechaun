"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      {/* ================= Background Glow ================= */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-center justify-center px-6 py-24 text-zinc-100">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-xl"
        >

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">
              Создать аккаунт
            </h1>
            <p className="mt-2 text-zinc-400 text-lg">
              Начните контролировать свои финансы
            </p>
          </div>

          {step === 1 && (
            <>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    bg-zinc-800/60
                    border border-zinc-700
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-500
                    transition-all
                  "
                  placeholder="you@example.com"
                />
              </div>

              {/* Button */}
              <Button
                className="
                  w-full
                  rounded-full
                  py-3
                  bg-gradient-to-r
                  from-emerald-500
                  via-green-500
                  to-teal-500
                  text-white
                  shadow-md
                  hover:scale-105
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
                onClick={() => setStep(2)}
              >
                Получить код
              </Button>

              <p className="mt-4 text-center text-sm text-zinc-400">
                Уже есть аккаунт?{" "}
                <Link
                  href="/login"
                  className="text-emerald-400 hover:underline"
                >
                  Войти
                </Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              {/* Code */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">
                  Код из письма
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    bg-zinc-800/60
                    border border-zinc-700
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-500
                    transition-all
                  "
                  placeholder="Введите код"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    bg-zinc-800/60
                    border border-zinc-700
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-500
                    transition-all
                  "
                  placeholder="Введите пароль"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    bg-zinc-800/60
                    border border-zinc-700
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-500
                    transition-all
                  "
                  placeholder="Повторите пароль"
                />
              </div>

              {/* Button */}
              <Button
                className="
                  w-full
                  rounded-full
                  py-3
                  bg-gradient-to-r
                  from-emerald-500
                  via-green-500
                  to-teal-500
                  text-white
                  shadow-md
                  hover:scale-105
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
                onClick={() => alert("Сохранить пользователя и перейти в ЛКП")}
              >
                Сохранить
              </Button>
            </>
          )}

        </motion.div>

      </main>
    </>
  );
}