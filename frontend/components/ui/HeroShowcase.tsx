"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const CARD_OFFSET = 56;
const SCALE_INACTIVE = 0.96;
const OPACITY_INACTIVE = 0.45;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const id = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(id);
  }, [ready, index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % screens.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + screens.length) % screens.length);
  };

  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  return (
    <div className="relative w-full max-w-xl">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px] overflow-hidden">
        {!ready && <HeroLoader />}

        {ready && (
          <>
            {/* PREVIOUS */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{ zIndex: 1 }}
              animate={{
                x: -CARD_OFFSET,
                scale: SCALE_INACTIVE,
                opacity: OPACITY_INACTIVE,
              }}
              transition={baseTransition}
            >
              <img
                src={screens[prevIndex]}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* NEXT */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{ zIndex: 1 }}
              animate={{
                x: CARD_OFFSET,
                scale: SCALE_INACTIVE,
                opacity: OPACITY_INACTIVE,
              }}
              transition={baseTransition}
            >
              <img
                src={screens[nextIndex]}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* ACTIVE */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
                style={{ zIndex: 2 }}
                initial={{
                  x: direction === 1 ? CARD_OFFSET : -CARD_OFFSET,
                }}
                animate={{
                  x: 0,
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  x: direction === 1 ? -CARD_OFFSET : CARD_OFFSET,
                  opacity: 0,
                }}
                transition={{
                  duration: 2.2,
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

            {/* CONTROLS */}
            <button
              onClick={handlePrev}
              className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-4xl text-zinc-500 hover:text-emerald-400 active:scale-90 transition"
            >
              ‹
            </button>

            <button
              onClick={handleNext}
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

const baseTransition = {
  duration: 2.2,
  ease: [0.22, 1, 0.36, 1],
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