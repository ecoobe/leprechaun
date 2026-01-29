"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import { HeroShowcase } from "@/components/ui/HeroShowcase";


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
  const faqItems = [
    {
      question: "Что такое Leprechaun?",
      answer: "Это ваш персональный финансовый помощник, который помогает управлять платежами по кредитам, картам и другим обязательствам. Мы напоминаем о платежах через Telegram, чтобы вы никогда не пропустили срок."
    },
    {
      question: "Как это работает?",
      answer: "Вы добавляете информацию о своих кредитах и картах в личном кабинете. Наш Telegram-бот подключается к вашему аккаунту и присылает уведомления о предстоящих платежах. Всё в одном месте — никакой путаницы."
    },
    {
      question: "Что можно добавить в систему?",
      answer: "Пока мы поддерживаем кредитные карты (сумма, дата займа, льготный период, минимальные платежи). В ближайших планах: кредиты, ипотека, депозиты и общая долговая нагрузка."
    },
    {
      question: "Почему это бесплатно?",
      answer: "Проект создаётся на энтузиазме, чтобы помочь людям разобраться с финансами. Я — единственный разработчик, и моя цель сделать мир немного понятнее, а не заработать на чужой беде."
    },
    {
      question: "А как же безопасность?",
      answer: "Мы не храним номера карт или пароли. Только информацию, необходимую для расчёта платежей. Вся архитектура построена с максимальным вниманием к безопасности данных."
    },
    {
      question: "Что будет дальше?",
      answer: "После запуска напоминаний мы добавим AI-помощника 'Плачу и плачу', который поможет составить индивидуальный план погашения долгов с учётом вашего дохода и избежать финансовых проблем."
    }
  ];

  return (
    <>
      {/* Background Glow Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
	  <Header />

      <main className="relative min-h-screen overflow-x-hidden text-zinc-100">
        {/* Hero Section */}
        <section className="relative w-full py-32">
  <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
    
    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Лепрекон
        <span className="block text-lg font-normal text-emerald-400 mt-2">
          Напомнит о платеже
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-zinc-300">
        Спокойствие в финансах. Лепрекон следит за платежами, напоминает вовремя
        и помогает держать всё под контролем.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          href="#faq"
          className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-400 transition"
        >
          Узнать больше
        </Link>
        <Link
          href="#faq"
          className="rounded-2xl border border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition"
        >
          Как начать?
        </Link>
      </div>
    </motion.div>

    {/* RIGHT */}
    <HeroShowcase />
  </div>
</section>

        {/* Value Proposition */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
              <div className="text-emerald-400 text-lg font-semibold mb-2">📅 Умные напоминания</div>
              <p className="text-sm text-zinc-300">Telegram-бот пришлёт уведомление вовремя, чтобы вы не пропустили платеж</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
              <div className="text-emerald-400 text-lg font-semibold mb-2">🧾 Всё в одном месте</div>
              <p className="text-sm text-zinc-300">Кредитные карты, кредиты, ипотека — все обязательства на одной панели</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
              <div className="text-emerald-400 text-lg font-semibold mb-2">🤖 AI-помощник</div>
              <p className="text-sm text-zinc-300">«Плачу и плачу» поможет составить план погашения с учётом вашего дохода</p>
            </div>
          </div>
        </section>

		<Testimonials />

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <p className="mt-2 text-zinc-400">
              Частые вопросы
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

        {/* CTA Section */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 text-center">
            <h3 className="text-xl font-semibold">Готовы начать?</h3>
            <p className="mt-2 text-zinc-400">
              Первая версия с напоминаниями о платежах по картам уже в разработке
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                0 пользователей уже взли свои финансы под контроль
              </div>
            </div>
          </div>
        </section>

        <SupportButton />

        {/* Footer */}
        <footer className="relative z-10 border-t border-zinc-800 px-6 py-10 text-center text-sm text-zinc-500">
          <div>Leprechaun — ваш финансовый помощник</div>
          <div className="mt-2 text-xs text-zinc-600">
            Сделано с заботой чтобы помочь разобраться с финансами
          </div>
        </footer>
      </main>
    </>
  );
}