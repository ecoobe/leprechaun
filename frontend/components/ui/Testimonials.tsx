"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Алексей Петров",
    role: "Предприниматель",
    text: "Leprechaun помог мне забыть о просроченных платежах. Теперь всё под контролем.",
    rating: 5,
  },
  {
    name: "Мария Иванова",
    role: "Дизайнер",
    text: "Простой и удобный интерфейс. Telegram-уведомления приходят вовремя.",
    rating: 5,
  },
  {
    name: "Дмитрий Соколов",
    role: "IT-специалист",
    text: "Отличное решение для тех, у кого несколько кредитных карт.",
    rating: 5,
  },
  {
    name: "Елена Смирнова",
    role: "Маркетолог",
    text: "Больше не переплачиваю проценты. Спасибо за напоминания!",
    rating: 5,
  },
  {
    name: "Игорь Козлов",
    role: "Финансовый аналитик",
    text: "Удобный инструмент для управления финансовыми обязательствами.",
    rating: 5,
  },
  {
    name: "Анна Волкова",
    role: "Менеджер проектов",
    text: "Интуитивно понятный сервис. Рекомендую друзьям.",
    rating: 5,
  },
  {
    name: "Сергей Новиков",
    role: "Разработчик",
    text: "Минимализм и максимум пользы. Именно то, что нужно.",
    rating: 5,
  },
  {
    name: "Ольга Морозова",
    role: "Консультант",
    text: "Leprechaun стал моим надёжным финансовым помощником.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: any) {
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
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-emerald-500 text-emerald-500"
            />
          ))}
        </div>

        {/* Text */}
        <p className="text-zinc-300 leading-relaxed mb-6">
          “{testimonial.text}”
        </p>

        {/* Author */}
        <div className="border-t border-zinc-800 pt-4">
          <p className="font-semibold text-zinc-100">
            {testimonial.name}
          </p>
          <p className="text-sm text-zinc-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 mb-20 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Что говорят пользователи
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Уже десятки людей управляют своими финансами спокойнее
          </p>
        </motion.div>
      </div>

      {/* First row */}
      <div className="relative mb-8">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max"
        >
          {[...firstRow, ...firstRow].map((t, idx) => (
            <TestimonialCard key={`first-${idx}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      {/* Second row */}
      <div className="relative">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max"
        >
          {[...secondRow, ...secondRow].map((t, idx) => (
            <TestimonialCard key={`second-${idx}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}