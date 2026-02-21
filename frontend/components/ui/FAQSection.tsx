"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* =========================
   FAQ Data
========================= */
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
      "После запуска напоминаний мы добавим AI-помощника, который поможет составить индивидуальный план погашения долгов с учётом вашего дохода и избежать финансовых проблем.",
  },
];

/* =========================
   FAQ Item
========================= */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`
        border border-zinc-800
        bg-zinc-900/60
        backdrop-blur
        transition-all duration-300
        hover:border-emerald-500/40
        hover:shadow-xl
        hover:shadow-emerald-500/10
        ${open ? "rounded-3xl" : "rounded-full"}
      `}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-10 py-7 text-left"
      >
        <span className="text-lg sm:text-xl font-medium tracking-tight">
          {question}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-500 text-xl"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-8 text-base sm:text-lg text-zinc-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================
   FAQ Section
========================= */
export function FAQSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header — выровнен как в HowItWorks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-left"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">
            FAQs
          </h2>
          <p className="mt-4 text-xl text-zinc-400 max-w-2xl">
            Частые вопросы
          </p>
        </motion.div>

        {/* Items */}
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

      </div>
    </section>
  );
}