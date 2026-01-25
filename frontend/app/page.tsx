"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-medium">{question}</span>
        <span className="text-zinc-500">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-zinc-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const stackItems = ["Go", "Docker", "Nginx", "Prometheus", "Grafana", "Next.js"];
  
  const faqItems = [
    {
      question: "Как это работает?",
      answer: "Проект построен как песочница: backend на Go, инфраструктура в Docker, мониторинг через Prometheus и Grafana. Можно разбирать и переиспользовать."
    },
    {
      question: "Какие инструменты используются?",
      answer: "Go, Docker, Nginx, Prometheus, Grafana, Next.js. Минимум магии — максимум прозрачности."
    },
    {
      question: "Почему это бесплатно?",
      answer: "Проект создаётся как учебный и исследовательский. Никакой монетизации, только практика и инженерный интерес."
    },
    {
      question: "О проекте / стеке",
      answer: "Leprechaun — infrastructure-first подход. Сначала надёжность, наблюдаемость и контроль, потом UI."
    }
  ];

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

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-semibold">Вопросы</h2>
            <p className="mt-2 text-zinc-400">
              Коротко и по делу — без маркетингового шума.
            </p>

            <div className="mt-10 space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-zinc-800 px-6 py-10 text-center text-sm text-zinc-500">
          Leprechaun · infrastructure-first mindset
        </footer>
      </main>
    </>
  );
}