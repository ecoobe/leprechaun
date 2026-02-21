"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import Link from "next/link";

export default function LoginPage() {
  const [emailLocked, setEmailLocked] = useState(false);

  return (
    <>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-xl">

          {/* ---------- STATIC HEADER ---------- */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">
              Войти в аккаунт
            </h1>
          </div>

          {/* ---------- ANIMATED FORM ---------- */}
          <motion.div
            layout
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            {/* Email */}
            <motion.div layout>
              <label className="block text-sm text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                disabled={emailLocked}
                placeholder="you@example.com"
                className={`
                  w-full rounded-xl px-4 py-3 text-white
                  border transition-all duration-300
                  ${
                    emailLocked
                      ? "bg-zinc-800/40 border-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-800/60 border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  }
                `}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm text-zinc-400 mb-2">
                Пароль
              </label>
              <input
                type="password"
                placeholder="Введите пароль"
                className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </motion.div>

            {/* Войти */}
            <motion.div layout>
              <Button
                onClick={() => setEmailLocked(true)}
                className="w-full rounded-full py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white"
              >
                Войти
              </Button>
            </motion.div>

            {/* Интерактивный текст */}
            <motion.div layout className="text-center mt-2 text-sm text-zinc-400">
              <span
                className="cursor-pointer text-emerald-400 hover:underline"
                onClick={() => alert("Форма восстановления пароля пока не реализована")}
              >
                Забыл пароль?
              </span>{" "}
              Впервые у нас?{" "}
              <Link href="/register" className="text-emerald-400 hover:underline">
                Зарегистрироваться
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}