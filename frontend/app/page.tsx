"use client";

import { useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/ui/AuthModal";
import { ContactButton } from "@/components/ui/ContactButton";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className="page">
      <BackgroundGradient />

      <Logo />

      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="secondary"
          onClick={() => setAuthOpen(true)}
        >
          Войти
        </Button>
      </div>

      <ContactButton />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </main>
  );
}