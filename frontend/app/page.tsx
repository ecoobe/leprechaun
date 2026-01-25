"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const stackItems = ["Go", "Docker", "Nginx", "Prometheus", "Grafana", "Next.js"];

  return (
    <>
      {/* Background Glow Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <main className="relative min-h-screen overflow-x-hidden text-zinc-100">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Leprechaun</h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg text-zinc-300"
            >
              Минималистичный проект с фокусом на инфраструктуру, мониторинг и
              аккуратный frontend без визуального шума.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex gap-4"
            >
              <Link
                href="#stack"
                className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400"
              >
                Стек
              </Link>
              <Link
                href="#about"
                className="rounded-2xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
              >
                О проекте
              </Link>
            </motion.div>
          </motion.div>
        </section>
		{/* How it works */}
<section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
  <h2 className="text-2xl font-semibold">Как это работает</h2>

  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Исследуешь",
        text: "Экспериментируешь с идеями, инфраструктурой и архитектурой без давления продакшена."
      },
      {
        title: "Собираешь",
        text: "Поднимаешь сервисы, мониторинг и окружение как единое целое."
      },
      {
        title: "Наблюдаешь",
        text: "Смотришь метрики, логи и поведение системы в реальных условиях."
      }
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur"
      >
        <h3 className="font-medium">{item.title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{item.text}</p>
      </div>
    ))}
  </div>
</section>
{/* Tools */}
<section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
  <h2 className="text-2xl font-semibold">Инструменты</h2>

  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[
      "Go — сервисы и утилиты",
      "Docker — изоляция и повторяемость",
      "Nginx — прокси и маршрутизация",
      "Prometheus — метрики",
      "Grafana — визуализация",
      "Next.js — аккуратный интерфейс"
    ].map((item) => (
      <li
        key={item}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-sm text-zinc-300 backdrop-blur"
      >
        {item}
      </li>
    ))}
  </ul>
</section>
{/* Why free */}
<section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
  <h2 className="text-2xl font-semibold">Почему бесплатно</h2>

  <p className="mt-6 max-w-3xl text-zinc-300">
    Leprechaun — это не продукт и не стартап. Это пространство для практики,
    экспериментов и роста.  
    Здесь нет продаж, рекламы и подписок — только инженерный интерес и желание
    делать вещи правильно.
  </p>
</section>
{/* About */}
<section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
  <h2 className="text-2xl font-semibold">О проекте</h2>

  <p className="mt-6 max-w-3xl text-zinc-300">
    Проект развивается инженером с опытом сопровождения, мониторинга и
    инфраструктуры.  
    Основной фокус — надёжность, наблюдаемость и понятная архитектура.
  </p>
</section>
        {/* About Section */}
        <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl font-semibold">Идея</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Leprechaun — это песочница для экспериментов с Go, Docker,
            мониторингом и инфраструктурой. Без лишнего UI — только то, что
            помогает думать и развиваться.
          </p>
        </section>

        {/* Stack Section */}
        <section id="stack" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl font-semibold">Стек</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-zinc-800 px-6 py-10 text-center text-sm text-zinc-500">
          Leprechaun · infrastructure-first mindset
        </footer>
      </main>
    </>
  );
}