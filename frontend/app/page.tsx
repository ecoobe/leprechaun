"use client";

import { Header } from "@/components/ui/Header";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { Testimonials } from "@/components/ui/Testimonials";
import { SupportButton } from "@/components/ui/SupportButton";

export default function Page() {
  return (
    <>
      <Header />

      <main className="bg-zinc-950 text-zinc-100 scroll-smooth">
        {/* HERO */}
        <section
          id="hero"
          className="min-h-screen snap-start flex items-center justify-center"
        >
          <div className="w-full max-w-7xl px-6">
            <HeroShowcase />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="min-h-screen snap-start flex items-center"
        >
          <div className="w-full max-w-7xl px-6 mx-auto">
            <h2 className="mb-12 text-4xl sm:text-5xl font-semibold">
              Как это работает
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature
                title="Умные напоминания"
                text="Лепрекон сам подскажет, когда лучше действовать, чтобы не упустить возможности."
              />
              <Feature
                title="Всё в одном месте"
                text="Все идеи, заметки и сигналы собраны в одном удобном интерфейсе."
              />
              <Feature
                title="AI-помощник"
                text="Искусственный интеллект анализирует данные и помогает принимать решения."
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="reviews"
          className="min-h-screen snap-start flex items-center relative overflow-hidden"
        >
          {/* затемнение по бокам */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

          <div className="w-full max-w-7xl px-6 mx-auto">
            <h2 className="mb-12 text-4xl sm:text-5xl font-semibold">
              Отзывы
            </h2>

            <Testimonials />
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="min-h-screen snap-start flex items-center"
        >
          <div className="w-full max-w-7xl px-6 mx-auto">
            <h2 className="mb-12 text-4xl sm:text-5xl font-semibold">
              FAQ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FaqItem
                q="Это платно?"
                a="Нет, базовый функционал доступен бесплатно."
              />
              <FaqItem
                q="Нужно ли что-то настраивать?"
                a="Минимум действий — Лепрекон всё сделает сам."
              />
              <FaqItem
                q="Подходит ли новичкам?"
                a="Да, интерфейс максимально простой и понятный."
              />
              <FaqItem
                q="Где работает сервис?"
                a="Сейчас — через Telegram, в будущем будет веб-версия."
              />
            </div>
          </div>
        </section>
      </main>

      <SupportButton />
    </>
  );
}

/* ---------- helpers ---------- */

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h3 className="mb-3 text-xl font-medium">{title}</h3>
      <p className="text-zinc-400 text-base leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function FaqItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h3 className="mb-2 text-lg font-medium">{q}</h3>
      <p className="text-zinc-400 text-base leading-relaxed">
        {a}
      </p>
    </div>
  );
}