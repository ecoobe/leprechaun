"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 6500);

    return () => clearInterval(id);
  }, [ready]);

  const current = screens[index];
  const next = screens[(index + 1) % screens.length];
  const afterNext = screens[(index + 2) % screens.length];

  return (
    <div className="relative w-full max-w-xl">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px]">
        {!ready && <HeroLoader />}

        {ready && (
          <>
            {/* third card (barely visible) */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900"
              animate={{
                x: 48,
                scale: 0.9,
                opacity: 0.18,
              }}
              transition={{
                duration: 6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* second card */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              animate={{
                x: 24,
                scale: 0.95,
                opacity: 0.4,
              }}
              transition={{
                duration: 6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={next}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* active card */}
            <motion.div
              key={current}
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              initial={false}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                x: {
                  duration: 5.5,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 5.5,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 3.2,
                  ease: "easeOut",
                  delay: 0.6, // 💎 убирает вспышку
                },
              }}
            >
              <img
                src={current}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function HeroLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}