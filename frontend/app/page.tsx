"use client";

import Link from "next/link";
import { ContactButton } from "@/components/ui/ContactButton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Кнопка входа */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          href="/login"
          className="
            rounded-full
            border border-zinc-800
            bg-zinc-900/40
            px-5 py-2.5
            text-sm font-medium
            text-zinc-200
            backdrop-blur-xl
            transition-all
            hover:border-zinc-700
            hover:bg-zinc-900/70
          "
        >
          Войти
        </Link>
      </div>

      {/* Кнопка связи */}
      <ContactButton />

      {/* Пока пустой экран */}
    </main>
  );
}