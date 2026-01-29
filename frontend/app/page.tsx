"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { Button } from "@/components/ui/Button";

// FAQ Item
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
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
        <span className="text-zinc-500 text-lg">
          {open ? "−" : "+"}
        </span>
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
        "Это ваш персональный финансовый помощник, который помогает управлять платежами по кредитам, картам и другим обязательствам. Мы напоминаем о платежах через Telegram.",
    },
    {
      question: "Как это работает?",
      answer:
        "Вы добавляете данные о картах и кредитах, а Telegram-бот присылает уведомления о платежах. Всё собрано в одном месте.",
    },
    {
      question: "Что можно добавить?",
      answer:
        "Пока — кредитные карты. В планах: кредиты, ипотека, депозиты и общая долговая нагрузка.",
    },
    {
      question: "Почему это бесплатно?",
      answer:
        "Проект создаётся одним разработчиком, чтобы помочь людям лучше понимать свои финансы.",
    },
    {
      question: "А безопасность?",
      answer:
        "Мы не храним номера карт и пароли. Только данные, необходимые для расчётов.",
    },
  ];

  return (
    <>
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen overflow-x-hidden">
        {/* HERO */}
        <section className="relative w-full py-36">
          <div className="mx-auto max-w-7xl px-6 grid gap-20 lg:grid-cols-2 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-tight">
                Лепрекон
                <span className="block mt-3 text-2xl sm:text-3xl font-medium text-emerald-400">
                  Спокойствие в финансах
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg sm:text-xl text-zinc-300 leading-relaxed">
                Лепрекон следит за твоей кармой в банках,
                напоминая о платежах и помогая держать
                всё под контролем.
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <Button asChild size="lg">
                  <Link href="#faq">Узнать больше</Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href="#faq">Как начать?</Link>
                </Button>
              </div>
            </motion.div>

            {/* RIGHT */}
            <HeroShowcase />
          </div>
        </section>

        {/* VALUE */}
        <section className="mx-auto max-w-6xl px-6 py-32">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "📅 Умные напоминания",
                text: "Telegram-уведомления вовремя",
              },
              {
                title: "🧾 Всё в одном месте",
                text: "Карты, кредиты и обязательства",
              },
              {
                title: "🤖 AI-помощник",
                text: "План погашения долгов",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur"
              >
                <div className="text-emerald-400 text-xl sm:text-2xl font-semibold mb-3">
                  {item.title}
                </div>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Testimonials />

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 py-32">
          <h2 className="text-3xl sm:text-4xl font-bold">
            FAQs
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-zinc-400">
            Частые вопросы
          </p>

          <div className="mt-12 space-y-6">
            {faqItems.map((item) => (
              <FAQItem
                key={item.question}
                {...item}
              />
            ))}
          </div>
        </section>

        <SupportButton />

        {/* FOOTER */}
        <footer className="border-t border-zinc-800 px-6 py-12 text-center text-sm sm:text-base text-zinc-500">
          <div>Leprechaun — ваш финансовый помощник</div>
          <div className="mt-3 text-xs sm:text-sm text-zinc-600">
            Сделано с заботой о ваших финансах
          </div>
        </footer>
      </main>
    </>
  );
}