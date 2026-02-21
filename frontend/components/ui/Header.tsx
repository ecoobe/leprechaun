"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav
        className="
          w-full
          flex
          items-center
          justify-between
          gap-8
          px-10
          py-4
          rounded-full
          bg-zinc-900/70
          backdrop-blur-xl
          border border-zinc-800
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
        "
      >
        {/* LOGO */}
        <Link
          href="/#hero"
          className="
            text-2xl
            tracking-tight
            text-white
            hover:opacity-80
            transition-opacity
            font-atelas
          "
        >
          Leprechaun
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium text-zinc-400">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            Как работает
          </Link>

          <Link href="/#testimonials" className="hover:text-white transition-colors">
            Отзывы
          </Link>

          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>

          <Link href="/#cta" className="hover:text-white transition-colors">
            Начать
          </Link>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="
            rounded-full
            px-7
            bg-gradient-to-r
            from-emerald-500
            via-green-500
            to-teal-500
            text-white
            shadow-md
            hover:scale-105
            hover:shadow-lg
            transition-all
            duration-300
          "
        >
          <Link href="/login">
            Войти
          </Link>
        </Button>
      </nav>
    </header>
  );
}