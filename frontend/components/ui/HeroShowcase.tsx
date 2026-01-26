"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const OFFSET = 48; // насколько выглядывают задние карточки
const SCALE_BG = 0.96;
const OPACITY_BG = 0.45;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 7000);

    return () => clearInterval(id);
  }, [ready]);

  const prev = screens[(index - 1 + screens.length) % screens.length];
  const current = screens[index];
  const next = screens[(index + 1) % screens.length];

  return (
    <div className="relative w-full max-w-xl">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px] overflow-hidden">
        {!ready && <HeroLoader />}

        {ready && (
          <>
            {/* PREVIOUS (left peek) */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{ zIndex: 1 }}
              animate={{
                x: -OFFSET,
                scale: SCALE_BG,
                opacity: OPACITY_BG,
              }}
              transition={transition}
            >
              <img
                src={prev}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* NEXT (right peek) */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{ zIndex: 1 }}
              animate={{
                x: OFFSET,
                scale: SCALE_BG,
                opacity: OPACITY_BG,
              }}
              transition={transition}
            >
              <img
                src={next}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* ACTIVE */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{ zIndex: 2 }}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={transition}
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

const transition = {
  duration: 2.6,
  ease: [0.22, 1, 0.36, 1], // мягкая "живая" кривая
};

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