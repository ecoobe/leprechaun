"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroShowcase } from "@/components/ui/HeroShowcase";

export function HeroSection() {
  return (
    <section className="section">
      <div className="container-wide grid gap-20 lg:grid-cols-2 items-center">

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
            о платежах и помогая держать всё под контролем.
          </p>

          <div className="mt-12 flex gap-6 flex-wrap">

            <Button asChild className="btn-primary px-8 py-6">
              <Link href="/register">
                Начать бесплатно
              </Link>
            </Button>

            <Button asChild className="btn-secondary px-8 py-6">
              <Link href="/how-it-works">
                Узнать больше
              </Link>
            </Button>

          </div>
        </motion.div>

        {/* RIGHT */}
        <HeroShowcase />

      </div>
    </section>
  );
}