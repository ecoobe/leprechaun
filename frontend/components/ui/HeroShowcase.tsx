"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const CARD_WIDTH = 360;
const GAP = 24;

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
    }, 7500);

    return () => clearInterval(id);
  }, [ready, index]);

  const next = () =>
    setIndex((i) => (i + 1) % screens.length);

  const prev = () =>
    setIndex((i) => (i - 1 + screens.length) % screens.length);

  return (
    <div className="relative w-full max-w-xl overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px] flex items-center justify-center">
        {!ready && <HeroLoader />}

        {ready && (
          <>
            {/* track */}
            <motion.div
              className="flex items-center"
              animate={{
                x: -(index * (CARD_WIDTH + GAP)),
              }}
              transition={{
                duration: 2.8,
                ease: [0.22, 1, 0.36, 1], // 👈 очень «человеческая» кривая
              }}
              style={{
                paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
              }}
            >
              {screens.map((src, i) => {
                const active = i === index;

                return (
                  <div
                    key={src}
                    className="shrink-0"
                    style={{
                      width: CARD_WIDTH,
                      marginRight: GAP,
                    }}
                  >
                    <div
                      className={`h-[360px] rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-all duration-700 ${
                        active
                          ? "scale-100 opacity-100"
                          : "scale-[0.94] opacity-60"
                      }`}
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* arrows */}
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