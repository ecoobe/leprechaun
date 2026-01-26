"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={screens[index]}
            src={screens[index]}
            alt="Leprechaun preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-auto"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}