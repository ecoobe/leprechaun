"use client";

import { motion } from "framer-motion";

const items = [
  { text: "Очень спокойно, когда всё под контролем.", author: "Мария" },
  { text: "Telegram-напоминания — гениально просто.", author: "Илья" },
  { text: "Жду AI-помощника, идея огонь.", author: "Ольга" },
  { text: "Перестал забывать про платежи.", author: "Андрей" },
];

export function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Отзывы</h2>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="min-w-[320px] rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <p className="text-zinc-300 mb-4">“{item.text}”</p>
              <div className="text-sm text-zinc-500">{item.author}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
