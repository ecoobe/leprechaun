"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="nav-container">
        {/* LOGO */}
        <Link href="/#hero" className="group">
          <span className="logo-text">leprechaun</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium">
          <Link href="/#how-it-works" className="nav-link">
            Как работает
          </Link>
          <Link href="/#testimonials" className="nav-link">
            Отзывы
          </Link>
          <Link href="/#faq" className="nav-link">
            FAQ
          </Link>
          <Link href="/#cta" className="nav-link">
            Начать
          </Link>
        </div>

        {/* CTA */}
        <Button asChild variant="primary">
          <Link href="/login">Войти</Link>
        </Button>
      </nav>
    </header>
  );
}