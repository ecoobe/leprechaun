"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-zinc-800 bg-zinc-950/70">
      <div className="w-full px-6">
        <div className="mx-auto max-w-6xl h-20 flex items-center justify-between">
          
          {/* Logo */}
          <span className="font-semibold text-2xl sm:text-3xl text-emerald-400">
            Leprechaun
          </span>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-base sm:text-lg font-medium text-zinc-400">
            <Link href="#how" className="hover:text-zinc-100 transition font-medium">
              Как работает
            </Link>
            <Link href="#reviews" className="hover:text-zinc-100 transition font-medium">
              Отзывы
            </Link>
            <Link href="#faq" className="hover:text-zinc-100 transition font-medium">
              FAQ
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="https://t.me/your_channel"
            target="_blank"
            className="rounded-xl bg-emerald-500 px-5 py-3 text-base sm:text-lg font-medium text-zinc-950 hover:bg-emerald-400 transition"
          >
            Войти
          </Link>

        </div>
      </div>
    </header>
  );
}