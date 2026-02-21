"use client";

import { Header } from "@/components/ui/Header";
import { SupportButton } from "@/components/ui/SupportButton";
import { Testimonials } from "@/components/ui/Testimonials";
import HowItWorks from "@/components/ui/HowItWorks";
import { HeroSection } from "@/components/ui/HeroSection";
import { FAQSection } from "@/components/ui/FAQSection";
import { CTASection } from "@/components/ui/CTASection";

/* =========================
   Home Page
========================= */
export default function HomePage() {
  return (
    <>
      {/* ================= Background Glow ================= */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen overflow-x-hidden text-zinc-100">

        {/* HERO */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* HOW IT WORKS */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* TESTIMONIALS */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* FAQ */}
        <div id="faq">
          <FAQSection />
        </div>

        {/* CTA */}
        <div id="cta">
          <CTASection />
        </div>

        <SupportButton />

      </main>
    </>
  );
}