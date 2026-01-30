"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { Button } from "@/components/ui/button";

/* FAQ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-8 py-6 text-left"
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="text-zinc-500">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 text-zinc-300">{answer}</div>
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
        "Персональный финансовый помощник с Telegram-напоминаниями о платежах.",
    },
    {
      question: "Как это работает?",
      answer:
        "Вы добавляете данные — бот присылает уведомления и помогает держать всё под контролем.",
    },
    {
      question: "Это безопасно?",
      answer:
        "Мы не храним номера карт и пароли. Только расчётную информацию.",
    },
  ];

  return (
    <>
      <Header />

      <main className="text-zinc-100 overflow-x-hidden">
        {/* HERO */}
        <section className="pt-40 pb-28">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-6xl sm:text-7xl font-semibold leading-tight">
                Лепрекон
              </h1>
              <p className="mt-4 text-emerald-400 text-3xl">
                Спокойствие в финансах
              </p>

              <p className="mt-6 max-w-xl text-lg text-zinc-300">
                Напоминаем о платежах, собираем всё в одном месте и помогаем
                держать контроль.
              </p>

              <div className="mt-10 flex gap-5">
                <Button
                  asChild
                  className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                >
                  <Link href="#how">Узнать больше</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#faq">Как начать?</Link>
                </Button>
              </div>
            </div>

            <HeroShowcase />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl font-bold mb-12">Как это работает</h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                ["📅 Умные напоминания", "Уведомления в Telegram вовремя"],
                ["🧾 Всё в одном месте", "Карты, кредиты, обязательства"],
                ["🤖 AI-помощник", "План погашения с учётом дохода"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
                >
                  <div className="text-emerald-400 text-xl font-semibold mb-3">
                    {title}
                  </div>
                  <p className="text-zinc-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" className="py-28">
          <div className="mx-auto max-w-6xl px-6 mb-12">
            <h2 className="text-4xl font-bold">Отзывы</h2>
          </div>
          <Testimonials />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-4xl font-bold mb-4">FAQ</h2>
            <p className="text-zinc-400 mb-10">Частые вопросы</p>

            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <FAQItem key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        <SupportButton />
      </main>
    </>
  );
}