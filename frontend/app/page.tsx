"use client";

import { useState } from "react";

import { AuthModal } from "@/components/ui/AuthModal";
import { ContactButton } from "@/components/ui/ContactButton";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { Logo } from "@/components/ui/Logo";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      <BackgroundGradient />

      <Logo />

      <button
        onClick={() => setAuthOpen(true)}
        className="
          absolute
          top-6
          right-6
          z-20
          rounded-full
          border
          border-zinc-800
          bg-black
          px-5
          py-2
          text-sm
          text-zinc-200
          transition-colors
          duration-150
          hover:border-zinc-600
          hover:bg-zinc-950
        "
      >
        Войти
      </button>

      <ContactButton />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </main>
  );
}