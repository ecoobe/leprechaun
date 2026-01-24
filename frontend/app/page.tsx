"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-zinc-100">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block mb-6 rounded-full border border-zinc-700 px-4 py-1 text-sm text-zinc-400">
            Спокойная инженерия
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
            Инфраструктура,
            <br />
            <span className="text-emerald-400">
              сделанная с умом
            </span>
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">
            Leprechaun — это платформа для аккуратной инфраструктуры,
            наблюдаемости и инженерного спокойствия.
            <br />
            Без лишнего шума. Без хаоса. Без сюрпризов.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button className="rounded-full bg-emerald-500 px-8 py-6 text-base font-medium text-black hover:bg-emerald-400 transition">
              Начать
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-zinc-700 px-8 py-6 text-base text-zinc-300 hover:bg-zinc-800 transition"
            >
              Документация
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Наблюдаемость",
              text: "Метрики, алерты и дашборды, которые действительно помогают, а не отвлекают.",
            },
            {
              title: "Безопасность",
              text: "Минимальные привилегии, понятные границы и предсказуемое поведение системы.",
            },
            {
              title: "Доставка",
              text: "Обновления без стресса. Контроль без микроменеджмента.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800 p-8 transition"
            >
              <h3 className="text-2xl font-medium mb-4">
                {item.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-zinc-500">
          <span>© 2026 Leprechaun</span>
          <span className="text-zinc-600">
            Инфраструктура без суеты
          </span>
        </div>
      </footer>
    </div>
  );
}