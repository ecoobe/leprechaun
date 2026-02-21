"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

export default function RegisterPage() {
  const [expanded, setExpanded] = useState(false);

  const dotGradient =
    "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500";

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

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  !expanded ? dotGradient : "bg-emerald-500"
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  expanded ? dotGradient : "bg-zinc-600"
                }`}
              />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Создать аккаунт
            </h1>
          </div>

          <div className="space-y-6">

            {/* EMAIL — всегда виден */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Email
              </label>

              <motion.input
                layout
                type="email"
                disabled={expanded}
                placeholder="you@example.com"
                className={`
                  w-full rounded-xl px-4 py-3 text-white
                  border
                  transition-all duration-300
                  ${
                    expanded
                      ? "bg-zinc-800/40 border-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-800/60 border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  }
                `}
              />
            </div>

            {/* STEP 2 раскрывается вниз */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="step2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <div className="space-y-6 pt-2">

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Код из письма
                      </label>
                      <input
                        type="text"
                        placeholder="Введите код"
                        className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Пароль
                      </label>
                      <input
                        type="password"
                        placeholder="Введите пароль"
                        className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Подтвердите пароль
                      </label>
                      <input
                        type="password"
                        placeholder="Повторите пароль"
                        className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Кнопка */}
            <Button
              onClick={() => setExpanded(true)}
              className="w-full rounded-full py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white"
            >
              {expanded ? "Сохранить" : "Получить код"}
            </Button>

          </div>
        </div>
      </main>
    </>
  );
}