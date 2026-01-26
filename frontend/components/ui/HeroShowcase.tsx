"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const CARD_WIDTH = 360;
const CARD_GAP = 24;
const AUTO_DELAY = 7000;

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
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [ready]);

  const offset =
    -(index * (CARD_WIDTH + CARD_GAP)) +
    CARD_WIDTH + CARD_GAP;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px] overflow-visible">
        {!ready && <HeroLoader />}

        {ready && (
          <motion.div
            className="absolute left-1/2 top-1/2 flex items-center"
            style={{
              transform: "translate(-50%, -50%)",
              gap: CARD_GAP,
            }}
            animate={{ x: offset }}
            transition={{
              duration: 2.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {screens.map((src, i) => {
              const isActive = i === index;

              return (
                <div
                  key={src}
                  className="relative"
                  style={{ width: CARD_WIDTH }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.94,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={{
                      duration: 1.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="w-full h-[420px] object-cover"
                      draggable={false}
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
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