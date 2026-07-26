"use client";

import { useState } from "react";
import { ContactButton } from "@/components/ui/ContactButton";
import { AuthModal } from "@/components/ui/AuthModal";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* Login button */}
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
          bg-zinc-950/40
          px-5
          py-2
          text-sm
          text-zinc-200
          backdrop-blur-sm
          transition
          hover:border-zinc-600
          hover:bg-zinc-900
        "
      >
        Войти
      </button>


      {/* Support */}
      <ContactButton />


      {/* Auth */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />

    </main>
  );
}