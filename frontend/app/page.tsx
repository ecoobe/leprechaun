"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { Button } from "@/components/ui/button";

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-8 py-6 text-left"
      >
        <span className="text-lg sm:text-xl font-medium tracking-tight">
          {question}
        </span>
        <span className="text-zinc-500 text-lg">{open ? "−" : "+"}</span>
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
            <div className="px-8 pb-6 text-base sm:text-lg text-zinc-300 leading-relaxed">
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
      answer:
        "Это ваш персональный финансовый помощник, который помогает управлять платежами по кредитам, картам и другим обязательствам. Мы напоминаем о платежах через Telegram, чтобы вы никогда не пропустили срок.",
    },
    {
      question: "Как это работает?",
      answer:
        "Вы добавляете информацию о своих кредитах и картах в личном кабинете. Наш Telegram-бот подключается к вашему аккаунту и присылает уведомления о предстоящих платежах. Всё в одном месте — никакой путаницы.",
    },
    {
      question: "Что можно добавить в систему?",
      answer:
        "Пока мы поддерживаем кредитные карты (сумма, дата займа, льготный период, минимальные платежи). В ближайших планах: кредиты, ипотека, депозиты и общая долговая нагрузка.",
    },
    {
      question: "Почему это бесплатно?",
      answer:
        "Проект создаётся на энтузиазме, чтобы помочь людям разобраться с финансами. Я — единственный разработчик, и моя цель сделать мир немного понятнее, а не заработать на чужой беде.",
    },
    {
      question: "А как же безопасность?",
      answer:
        "Мы не храним номера карт или пароли. Только информацию, необходимую для расчёта платежей. Вся архитектура построена с максимальным вниманием к безопасности данных.",
    },
    {
      question: "Что будет дальше?",
      answer:
        "После запуска напоминаний мы добавим AI-помощника 'Плачу и плачу', который поможет составить индивидуальный план погашения долгов с учётом вашего дохода и избежать финансовых проблем.",
    },
  ];

  return (
    <>
      {/* Background Glow Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen overflow-x-hidden text-zinc-100">
        {/* Hero Section */}
        <section className="relative w-full py-36">
          <div className="mx-auto max-w-7xl px-6 grid gap-20 lg:grid-cols-2 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-6xl sm:text-8xl font-semibold tracking-tight leading-tight">
                Лепрекон
                <span className="block text-3xl sm:text-4xl font-medium tracking-tight leading-snug text-emerald-400 mt-3">
                  Спокойствие в финансах
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg sm:text-xl text-zinc-300 leading-relaxed">
                Лепрекон следит за твоей кармой в банках, напоминая вовремя
                о платежах и помогая держать всё под контролем
              </p>

              <div className="mt-12 flex gap-6">
                <Button
                  asChild
                  className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                >
                  <Link href="#faq">Узнать больше</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="#faq">Как начать?</Link>
                </Button>
              </div>
            </motion.div>

            {/* RIGHT */}
            <HeroShowcase />
          </div>
        </section>

        {/* Value Proposition */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
              <div className="text-emerald-400 text-xl sm:text-2xl font-semibold mb-3">
                📅 Умные напоминания
              </div>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Telegram-бот пришлёт уведомление вовремя, чтобы вы не пропустили
                платеж
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
              <div className="text-emerald-400 text-xl sm:text-2xl font-semibold mb-3">
                🧾 Всё в одном месте
              </div>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Кредитные карты, кредиты, ипотека — все обязательства на одной панели
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
              <div className="text-emerald-400 text-xl sm:text-2xl font-semibold mb-3">
                🤖 AI-помощник
              </div>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                «Плачу и плачу» поможет составить план погашения с учётом вашего дохода
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-left mb-12">
            Отзывы
          </h2>
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-left"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">FAQs</h2>
            <p className="mt-3 text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Частые вопросы
            </p>

            <div className="mt-12 space-y-6">
              {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-32">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold">Готовы начать?</h3>
            <p className="mt-4 text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Пользователей, уже взявших свои финансы под контроль
            </p>
            <div className="mt-8">
              <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-base sm:text-lg text-emerald-400">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                12
              </div>
            </div>
          </div>
        </section>

        <SupportButton />

        {/* Footer */}
        <footer className="relative z-10 border-t border-zinc-800 px-6 py-12 text-center text-sm sm:text-base text-zinc-500">
          <div>Leprechaun — ваш финансовый помощник</div>
          <div className="mt-3 text-xs sm:text-sm text-zinc-600">
            Сделано с заботой чтобы помочь разобраться с финансами
          </div>
        </footer>
      </main>
    </>
  );
}