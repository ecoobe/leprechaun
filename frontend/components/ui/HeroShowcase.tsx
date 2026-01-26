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
  const [ready, setReady] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const id = setInterval(() => {
      next();
    }, 7000);

    return () => clearInterval(id);
  }, [ready, index]);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % screens.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + screens.length) % screens.length);
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px] overflow-hidden">
        {!ready && <HeroLoader />}

        {ready && (
          <>
            {/* left (previous) */}
            <div className="absolute inset-0 -translate-x-8 scale-[0.96] opacity-40 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden z-0">
              <img
                src={screens[(index - 1 + screens.length) % screens.length]}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* right (next) */}
            <div className="absolute inset-0 translate-x-8 scale-[0.96] opacity-40 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden z-0">
              <img
                src={screens[(index + 1) % screens.length]}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* active */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden z-10"
                initial={{
                  x: direction === 1 ? 80 : -80,
                  opacity: 0,
                  scale: 0.98,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  x: direction === 1 ? -80 : 80,
                  opacity: 0,
                  scale: 0.98,
                }}
                transition={{
                  duration: 2.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={screens[index]}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <button
              onClick={prev}
              className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-4xl text-zinc-500 hover:text-emerald-400 active:scale-90 transition"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-[-48px] top-1/2 -translate-y-1/2 text-4xl text-zinc-500 hover:text-emerald-400 active:scale-90 transition"
            >
              ›
            </button>
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
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}