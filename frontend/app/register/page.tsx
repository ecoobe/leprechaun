"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  const dotColor =
    "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500";

  return (
    <>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-center justify-center px-6 py-24 text-zinc-100">
        {/* ✨ ВАЖНО: layout здесь делает плавное расширение */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            layout: { duration: 0.6, ease: "easeInOut" },
            opacity: { duration: 0.4 },
          }}
          className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <motion.div
                layout
                animate={
                  step === 1 ? { scale: [1, 1.15, 1] } : { scale: 1 }
                }
                transition={{
                  repeat: step === 1 ? Infinity : 0,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className={`w-2.5 h-2.5 rounded-full ${
                  step === 1 ? dotColor : "bg-emerald-500"
                }`}
              />

              <motion.div
                layout
                animate={
                  step === 2 ? { scale: [1, 1.15, 1] } : { scale: 1 }
                }
                transition={{
                  repeat: step === 2 ? Infinity : 0,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className={`w-2.5 h-2.5 rounded-full ${
                  step === 2 ? dotColor : "bg-zinc-600"
                }`}
              />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Создать аккаунт
            </h1>
          </div>

          {/* Контент */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full rounded-full py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
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
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <motion.div layout>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Код из письма
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Введите код"
                  />
                </motion.div>

                <motion.div layout>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Введите пароль"
                  />
                </motion.div>

                <motion.div layout>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Подтвердите пароль
                  </label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) =>
                      setPasswordConfirm(e.target.value)
                    }
                    className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Повторите пароль"
                  />
                </motion.div>

                <Button
                  className="w-full rounded-full py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Сохранить
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}