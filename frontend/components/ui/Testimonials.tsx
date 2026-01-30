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
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: reverse ? [0, -1200] : [-1200, 0] }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={i}
            className="min-w-[360px] rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur"
          >
            <p className="text-lg text-zinc-300 leading-relaxed">
              “{r.text}”
            </p>
            <div className="mt-5 text-sm text-zinc-400">{r.name}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="space-y-10">
      <Row />
      <Row reverse />
    </div>
  );
}