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
      next();
    }, 7000);

    return () => clearInterval(id);
  }, [ready, index]);

  const next = () =>
    setIndex((i) => (i + 1) % screens.length);

  const prev = () =>
    setIndex((i) => (i - 1 + screens.length) % screens.length);

  return (
    <div className="relative w-full max-w-xl">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px]">
        {!ready && <HeroLoader />}

        {ready &&
          screens.map((src, i) => {
            const offset =
              i === index
                ? 0
                : i === (index - 1 + screens.length) % screens.length
                ? -1
                : i === (index + 1) % screens.length
                ? 1
                : 99;

            if (Math.abs(offset) > 1) return null;

            return (
              <motion.div
                key={src}
                className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
                animate={{
                  x: offset * 36,
                  scale: offset === 0 ? 1 : 0.96,
                  opacity: offset === 0 ? 1 : 0.55,
                }}
                transition={{
                  duration: 3.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: offset === 0 ? 10 : 5,
                }}
              >
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
            );
          })}

        {/* controls */}
        {ready && (
          <>
            <button
              onClick={prev}
              className="absolute left-[-44px] top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800 transition"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-[-44px] top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800 transition"
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