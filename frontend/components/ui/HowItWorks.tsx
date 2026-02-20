"use client";

import { motion } from "framer-motion";
import { CreditCard, Bot, Bell } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Добавьте кредитную карту",
    description:
      "Введите сумму, дату займа и льготный период. Мы рассчитаем ключевые сроки.",
    features: [
      "Сумма займа",
      "Дата займа",
      "Льготный период",
      "Отслеживание платежей",
    ],
  },
  {
    icon: Bot,
    title: "Подключите Telegram-бота",
    description:
      "Получите персональный токен и подключите бота за несколько секунд.",
    features: [
      "Уникальный токен",
      "Подключение в один клик",
      "Мгновенная настройка",
    ],
  },
  {
    icon: Bell,
    title: "Получайте напоминания",
    description:
      "Мы заранее предупредим о минимальном платеже и конце льготного периода.",
    features: [
      "Уведомления о льготном периоде",
      "Минимальные платежи",
      "Контроль сроков",
    ],
  },
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-32">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">
            Как это работает
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Три шага к финансовому спокойствию
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/60
                backdrop-blur
                p-10
                hover:border-emerald-500/40
                transition-all
                duration-300
              "
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-emerald-400" />
              </div>

              <div className="text-sm text-emerald-400 font-medium mb-2">
                Шаг {index + 1}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-zinc-400 mb-6 leading-relaxed">
                {step.description}
              </p>

              <ul className="space-y-3">
                {step.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}