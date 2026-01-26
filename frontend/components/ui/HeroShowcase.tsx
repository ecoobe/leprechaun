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

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 4500);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      {/* мягкое свечение */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px]">
        {screens.map((src, i) => {
          const position =
            (i - index + screens.length) % screens.length;

          // показываем только 3 карточки
          if (position > 2) return null;

          return (
            <motion.div
              key={src}
              className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur overflow-hidden"
              animate={{
                x: position * 40,        // сдвиг вправо
                scale: 1 - position * 0.06,
                opacity: 1 - position * 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // smooth easing
              }}
              style={{
                zIndex: 10 - position,
              }}
            >
              <img
                src={src}
                alt="Leprechaun preview"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}