"use client";

import { Header } from "@/components/ui/Header";

export default function SettingsPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <div className="form-card max-w-md w-full">
          <h1 className="form-title mb-6">Настройки профиля</h1>
          <p className="text-zinc-400">
            Здесь будут располагаться настройки пользователя.
          </p>
        </div>
      </main>
    </>
  );
}