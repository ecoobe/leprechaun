"use client";

import { motion } from "framer-motion";

const reviews = [
  { name: "Алексей", text: "Наконец-то перестал пропускать платежи по карте." },
  { name: "Мария", text: "Очень спокойно, когда всё собрано в одном месте." },
  { name: "Илья", text: "Telegram-напоминания — гениально просто." },
  { name: "Ольга", text: "Жду AI-помощника, идея огонь." },
  { name: "Дмитрий", text: "Минимализм и польза, без воды." },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: reverse ? [0, -1200] : [-1200, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: "linear",
        }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={i}
            className="
              min-w-[300px]
              rounded-2xl
              border border-zinc-800
              bg-zinc-900/70
              p-5
              backdrop-blur
              shadow-lg
            "
          >
            <p className="text-sm text-zinc-300 leading-relaxed">
              “{r.text}”
            </p>
            <div className="mt-4 text-xs text-zinc-500">
              {r.name}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Градиентная маска по краям */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative z-10 mx-auto max-w-6xl px-6 py-28"
    >
      <h2 className="mb-14 px-12 text-3xl font-semibold"> // тут поменял
        Отзывы
      </h2>

      <div className="space-y-8">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}