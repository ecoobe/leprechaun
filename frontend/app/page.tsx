"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { Button } from "@/components/ui/button";

/* ---------------- FAQ ---------------- */

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
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
            <div className="px-6 pb-5 text-zinc-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function HomePage() {
  const faqItems = [
    {
      question: "Что такое Leprechaun?",
      answer:
        "Персональный финансовый помощник, который помогает не забывать о платежах и держать обязательства под контролем.",
    },
    {
      question: "Как это работает?",
      answer:
        "Вы добавляете данные, а Telegram-бот присылает напоминания о платежах в нужный момент.",
    },
    {
      question: "Это безопасно?",
      answer:
        "Мы не храним номера карт и пароли — только расчётные данные.",
    },
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-x-hidden text-zinc-100">

        {/* ---------------- HERO ---------------- */}
        <section className="relative py-32">
          <div className="mx-auto max-w-6xl px-6 grid gap-20 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight">
                Лепрекон
              </h1>
              <p className="mt-4 text-emerald-400 text-2xl">
                Спокойствие в финансах
              </p>

              <p className="mt-8 max-w-xl text-lg text-zinc-300">
                Лепрекон следит за твоими обязательствами и вовремя напоминает о платежах,
                чтобы финансы не вызывали тревогу.
              </p>

              <div className="mt-10 flex gap-4">
                <Button asChild className="bg-emerald-500 text-black">
                  <Link href="#how">Как это работает</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#faq">FAQ</Link>
                </Button>
              </div>
            </motion.div>

            <HeroShowcase />
          </div>
        </section>

        {/* ---------------- HOW IT WORKS ---------------- */}
        <section
          id="how"
          className="py-28 border-t border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl font-semibold mb-12">
              Как это работает
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Умные напоминания",
                  text: "Telegram-бот напомнит о платеже вовремя.",
                },
                {
                  title: "Всё в одном месте",
                  text: "Карты, кредиты и обязательства — в одной панели.",
                },
                {
                  title: "AI-помощник",
                  text: "План погашения с учётом дохода (скоро).",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
                >
                  <div className="text-emerald-400 font-medium text-lg">
                    {item.title}
                  </div>
                  <p className="mt-3 text-zinc-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TESTIMONIALS ---------------- */}
        <section
          id="reviews"
          className="py-28 border-t border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-6 mb-12">
            <h2 className="text-4xl font-semibold">
              Отзывы
            </h2>
          </div>

          <Testimonials />
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section
          id="faq"
          className="py-28 border-t border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl font-semibold mb-12">
              FAQ
            </h2>

            <div className="max-w-3xl space-y-4">
              {faqItems.map((item, i) => (
                <FAQItem key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        <SupportButton />

        <footer className="border-t border-zinc-900 py-10 text-center text-sm text-zinc-500">
          Leprechaun — финансовый помощник
        </footer>
      </main>
    </>
  );
}