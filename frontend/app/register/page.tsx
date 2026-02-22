"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

export default function RegisterPage() {
  const [expanded, setExpanded] = useState(false);

  // Задержки для последовательного появления полей
  const fieldDelays = [0.05, 0.15, 0.25];

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
          {/* Header with dots */}
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

          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <motion.div
              initial={false}
              layout
            >
              <label className="form-label">Email</label>
              <input
                type="email"
                disabled={expanded}
                placeholder="you@example.com"
                className={`form-input ${expanded ? "disabled" : ""}`}
              />
            </motion.div>

            {/* Expanded fields: появляются поочередно через opacity */}
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
                    placeholder="Повторите пароль"
                    className="form-input"
                  />
                </motion.div>
              </>
            )}

            {/* Button */}
            <motion.div
              layout
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Button
                onClick={() => setExpanded(true)}
                variant="primary"
                className="w-full rounded-full py-3"
              >
                {expanded ? "Сохранить" : "Получить код"}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}