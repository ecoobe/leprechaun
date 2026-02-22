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
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Войти в аккаунт</h1>
          </div>

          <motion.div
            layout
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            {/* Email */}
            <motion.div layout>
              <label className="form-label">Email</label>
              <input
                type="email"
                disabled={emailLocked}
                placeholder="you@example.com"
                className={`form-input ${emailLocked ? "disabled" : ""}`}
                // В Tailwind класс disabled уже учтён в .form-input:disabled, но для динамики можно оставить условный класс
              />
            </motion.div>

            {/* Password */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="form-label">Пароль</label>
              <input
                type="password"
                placeholder="Введите пароль"
                className="form-input"
              />
            </motion.div>

            {/* Submit button */}
            <motion.div layout>
              <Button
                onClick={() => setEmailLocked(true)}
                variant="primary"
                className="w-full rounded-full py-3"
              >
                Войти
              </Button>
            </motion.div>

            {/* Links */}
            <motion.div layout className="text-center mt-2 form-text-muted space-y-1">
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
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}