"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

        {/* ================= HERO ================= */}
		<section id="hero" className="relative py-36 px-6">
			<HeroSection />
		</section>


        {/* ================= HOW IT WORKS ================= */}
		<section id="how-it-works" className="relative py-36 px-6">
			<HowItWorks />
		</section>

        {/* ================= TESTIMONIALS ================= */}
		<section id="testimonials" className="relative py-36 px-6">
			<Testimonials />
		</section>

        {/* ================= FAQ ================= */}
		<section id="faq" className="relative py-36 px-6">
			<FAQSection />
		</section>

        {/* ================= CTA ================= */}
		<section id="cta" className="relative py-36 px-6">
			<CTASection />
		</section>

		{/* ================= SupportButton ================= */}
        <SupportButton />

      </main>
    </>
  );
}