"use client";

import { motion } from "framer-motion";

const reviews = [
  { name: "Алексей", text: "Наконец-то перестал пропускать платежи." },
  { name: "Мария", text: "Очень спокойно, когда всё собрано в одном месте." },
  { name: "Илья", text: "Telegram-напоминания — гениально просто." },
  { name: "Ольга", text: "Жду AI-помощника, идея огонь." },
];

export function Testimonials() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex gap-6 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={i}
            className="min-w-[320px] rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <p className="text-zinc-300">“{r.text}”</p>
            <div className="mt-4 text-sm text-zinc-400">
              {r.name}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}