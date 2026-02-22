"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

export default function RegisterPage() {
  const [expanded, setExpanded] = useState(false);

  const collapsedHeight = 260;
  const expandedHeight = 520;

  const fieldDelays = [0.05, 0.15, 0.25];

  return (
    <>
      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <motion.div
          className="form-card relative overflow-hidden"
          animate={{ height: expanded ? expandedHeight : collapsedHeight }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div className="form-header">
            <h1 className="form-title">Создать аккаунт</h1>
          </div>

          <div className="relative px-10">
            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                disabled={expanded}
                placeholder="you@example.com"
                className="form-input"
              />
            </div>

            {/* Поля появляются абсолютно, не влияя на layout */}
            {expanded && (
              <>
                <motion.div
                  className="absolute left-10 right-10"
                  style={{ top: 120 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[0] }}
                >
                  <label className="form-label">Код из письма</label>
                  <input type="text" className="form-input" />
                </motion.div>

                <motion.div
                  className="absolute left-10 right-10"
                  style={{ top: 200 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[1] }}
                >
                  <label className="form-label">Пароль</label>
                  <input type="password" className="form-input" />
                </motion.div>

                <motion.div
                  className="absolute left-10 right-10"
                  style={{ top: 280 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: fieldDelays[2] }}
                >
                  <label className="form-label">Подтвердите пароль</label>
                  <input type="password" className="form-input" />
                </motion.div>
              </>
            )}

            {/* Кнопка двигается вниз вручную */}
            <motion.div
              className="absolute left-10 right-10"
              animate={{ y: expanded ? 300 : 100 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Button
                onClick={() => setExpanded(true)}
                className="w-full rounded-full py-3"
              >
                {expanded ? "Сохранить" : "Получить код"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
}