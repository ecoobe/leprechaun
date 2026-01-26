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
    const timeout = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const id = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(id);
  }, [ready]);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % screens.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + screens.length) % screens.length);
  };

  return (
    <div className="relative w-full max-w-xl group">
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      {/* Stack preview */}
      <div className="relative h-[320px]">
        {screens.map((src, i) => {
          const offset = (i - index + screens.length) % screens.length;

          if (offset > 2) return null;

          return (
            <motion.img
              key={src}
              src={src}
              alt="Leprechaun preview"
              className="absolute inset-0 w-full rounded-3xl border border-zinc-800 bg-zinc-900 object-cover"
              style={{ zIndex: 10 - offset }}
              initial={false}
              animate={{
                x: offset === 0 ? 0 : offset * 24,
                scale: offset === 0 ? 1 : 0.96,
                opacity: offset === 0 ? 1 : 0.4,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.9,
              }}
            />
          );
        })}
      </div>

      {/* Navigation arrows */}
      {ready && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 opacity-0 group-hover:opacity-100 transition hover:text-zinc-100"
          >
            &lt;
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 opacity-0 group-hover:opacity-100 transition hover:text-zinc-100"
          >
            &gt;
          </button>
        </>
      )}
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
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
}