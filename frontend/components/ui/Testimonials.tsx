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
    <motion.div
      className="flex gap-6"
      animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
      transition={{
        repeat: Infinity,
        duration: 40,
        ease: "linear",
      }}
    >
      {[...reviews, ...reviews].map((r, i) => (
        <div
          key={i}
          className="min-w-[280px] rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur"
        >
          <p className="text-sm text-zinc-300">“{r.text}”</p>
          <div className="mt-3 text-xs text-zinc-500">{r.name}</div>
        </div>
      ))}
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 overflow-hidden"
    >
      <h2 className="text-2xl font-semibold mb-10">
        Пользователи о Leprechaun
      </h2>

      <div className="space-y-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}