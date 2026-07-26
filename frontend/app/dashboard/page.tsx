"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex justify-end p-6">
        <Link
          href="/login"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium transition-colors hover:border-zinc-500 hover:bg-zinc-900"
        >
          Войти
        </Link>
      </header>
    </main>
  );
}