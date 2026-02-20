"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      
      <nav
        className="
          w-full
          max-w-[1200px]
          flex
          items-center
          justify-between
          gap-8
          px-8
          py-4
          rounded-full
          bg-zinc-900/70
          backdrop-blur-xl
          border border-zinc-800
          shadow-2xl shadow-black/40
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="
              w-10 h-10
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              via-green-500
              to-teal-500
              flex
              items-center
              justify-center
              shadow-lg
              shadow-emerald-500/30
              transition-all
              group-hover:scale-105
              group-hover:shadow-xl
            "
          >
            <span className="text-white font-bold text-lg">
              🍀
            </span>
          </div>

          <span className="text-xl font-bold text-emerald-400">
            Leprechaun
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-zinc-400">
          <Link href="#how" className="hover:text-white transition">
            Как работает
          </Link>
          <Link href="#reviews" className="hover:text-white transition">
            Отзывы
          </Link>
          <Link href="#faq" className="hover:text-white transition">
            FAQ
          </Link>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="
            rounded-full
            px-6
            bg-gradient-to-r
            from-emerald-500
            via-green-500
            to-teal-500
            text-white
            shadow-lg
            shadow-emerald-500/40
            hover:shadow-xl
            hover:shadow-emerald-500/60
            hover:scale-105
            transition-all
            duration-300
          "
        >
          <Link href="https://t.me/your_channel" target="_blank">
            Войти
          </Link>
        </Button>

      </nav>
    </header>
  );
}