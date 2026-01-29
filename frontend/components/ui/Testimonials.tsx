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
    <div className="relative overflow-visible py-4">
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
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative z-10 w-full py-36 sm:py-44">
      <div className="space-y-12 sm:space-y-16">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}