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
    <div className="relative overflow-visible py-4"> {/* overflow-visible и padding сверху/снизу */}
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: reverse ? [0, -1400] : [-1400, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear",
        }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            className="
              min-w-[350px] sm:min-w-[400px]
              rounded-3xl
              border border-zinc-800
              bg-zinc-900/70
              p-8 sm:p-10
              backdrop-blur
              shadow-xl
              transition-transform duration-300
            "
          >
            <p className="text-base sm:text-lg leading-relaxed text-zinc-300 font-sans font-normal">
              “{r.text}”
            </p>
            <div className="mt-6 text-sm sm:text-base text-zinc-400 font-medium">
              {r.name}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Градиентная маска по краям */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-32 sm:w-48 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 sm:w-48 bg-gradient-to-l from-zinc-950 to-transparent" />
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative z-10 w-full py-36 sm:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight font-sans">
          Отзывы
        </h2>
      </div>

      <div className="space-y-12 sm:space-y-16">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}