"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="nav-container flex items-center justify-between">
        {/* Логотип слева — ведёт на главную */}
        <Link href="/#hero" className="group shrink-0">
          <span className="logo-text">leprechaun</span>
        </Link>

        {/* Центральный блок — навигация для гостей */}
        <div className="flex-1 flex justify-center">
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
        </div>

        {/* Правый блок — кнопка "Войти" */}
        <div className="shrink-0">
          <Button asChild variant="primary">
            <Link href="/login">Войти</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}