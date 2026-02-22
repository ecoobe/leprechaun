"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="glass-nav w-full flex items-center justify-between gap-8 px-10 py-4 rounded-full">

        {/* LOGO */}
        <Link href="/#hero">
          <span className="logo-text">
            leprechaun
          </span>
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
        <Button asChild className="btn-primary px-7 py-3">
          <Link href="/login">Войти</Link>
        </Button>

      </nav>
    </header>
  );
}