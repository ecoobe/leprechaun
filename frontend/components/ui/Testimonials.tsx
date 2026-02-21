"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

/* =========================
   Data
========================= */

const testimonials = [
  { name: "Алексей Петров", text: "Leprechaun помог мне забыть о просроченных платежах. Теперь всё под контролем.", rating: 5 },
  { name: "Мария Иванова", text: "Простой и удобный интерфейс. Telegram-уведомления приходят вовремя.", rating: 5 },
  { name: "Дмитрий Соколов", text: "Отличное решение для тех, у кого несколько кредитных карт.", rating: 5 },
  { name: "Елена Смирнова", text: "Больше не переплачиваю проценты. Спасибо за напоминания!", rating: 5 },
  { name: "Игорь Козлов", text: "Удобный инструмент для управления финансовыми обязательствами.", rating: 5 },
  { name: "Анна Волкова", text: "Интуитивно понятный сервис. Рекомендую друзьям.", rating: 5 },
  { name: "Сергей Новиков", text: "Минимализм и максимум пользы. Именно то, что нужно.", rating: 5 },
  { name: "Ольга Морозова", text: "Leprechaun стал моим надёжным финансовым помощником.", rating: 5 },
];

/* =========================
   Card
========================= */

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="flex-shrink-0 w-[340px] mx-4">
      <div
        className="
          h-full
          rounded-3xl
          border border-zinc-800
          bg-zinc-900/60
          backdrop-blur
          p-8
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-emerald-500/40
          hover:shadow-xl
          hover:shadow-emerald-500/10
        "
      >
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          ))}
        </div>

        <p className="text-zinc-300 leading-relaxed mb-6">
          “{testimonial.text}”
        </p>

        <div className="border-t border-zinc-800 pt-4">
          <p className="font-semibold text-zinc-100">
            {testimonial.name}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Main
========================= */

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section className="relative py-32 px-6">

      {/* Контейнер как в HowItWorks */}
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-left"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">
            Что говорят пользователи
          </h2>
          <p className="mt-4 text-xl text-zinc-400 max-w-2xl">
            Уже десятки людей управляют своими финансами спокойнее
          </p>
        </motion.div>

      </div>

      {/* Row wrapper с маской */}
      <div
        className="relative w-full pt-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >

        {/* First row */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mb-8"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            className="flex w-max"
          >
            {[...firstRow, ...firstRow].map((t, idx) => (
              <TestimonialCard key={`first-${idx}`} testimonial={t} />
            ))}
          </motion.div>
        </div>

        {/* Second row */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            className="flex w-max"
          >
            {[...secondRow, ...secondRow].map((t, idx) => (
              <TestimonialCard key={`second-${idx}`} testimonial={t} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}