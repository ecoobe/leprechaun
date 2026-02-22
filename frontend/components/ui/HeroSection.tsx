"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroShowcase } from "@/components/ui/HeroShowcase";

export function HeroSection() {
  return (
    <section className="relative py-36 px-6">
      <div className="mx-auto max-w-7xl grid gap-20 lg:grid-cols-2 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl sm:text-8xl font-semibold tracking-tight leading-tight">
            Лепрекон
            <span className="block text-3xl sm:text-4xl font-medium text-emerald-400 mt-3 tracking-wide">
              Спокойствие в финансах
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Лепрекон следит за твоей кармой в банках, напоминая вовремя
            о платежах и помогая держать всё под контролем.
          </p>

          <div className="mt-12 flex gap-6 flex-wrap">
            <Button asChild variant="primary" size="lg">
              <Link href="/register">Начать бесплатно</Link>
            </Button>

            <Button asChild variant="secondary" size="lg">
              <Link href="/how-it-works">Узнать больше</Link>
            </Button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <HeroShowcase />
      </div>
    </section>
  );
}