"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Fixed background */}
<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800" />
  
  {/* Blue glow */}
  <div className="absolute -top-48 -left-48 h-[700px] w-[700px] rounded-full blur-[180px]"
    style={{ background: "rgba(16, 185, 129, 0.55)" }} />
  {/* Green glow */}
  <div className="absolute top-1/3 -right-48 h-[700px] w-[700px] rounded-full blur-[200px]"
    style={{ background: "rgba(99, 102, 241, 0.45)" }} />
</div>

      <main className="relative min-h-screen overflow-x-hidden text-zinc-100">
        {/* Hero */}
        <section className="mx-auto flex max-w-6xl flex-col items-start px-6 py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Leprechaun
          </motion.h1>

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
        </section>

        {/* About */}
        <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl font-semibold">Идея</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Leprechaun — это песочница для экспериментов с Go, Docker,
            мониторингом и инфраструктурой. Без лишнего UI — только то, что
            помогает думать и развиваться.
          </p>
        </section>

        {/* Stack */}
        <section id="stack" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl font-semibold">Стек</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Go", "Docker", "Nginx", "Prometheus", "Grafana", "Next.js"].map(
              (item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur"
                >
                  {item}
                </li>
              )
            )}
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