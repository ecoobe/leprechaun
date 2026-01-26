"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const AUTO_DELAY = 6000;
const SLIDE_DURATION = 1.6;

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % screens.length);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative h-[420px] overflow-visible flex items-center justify-center">
        {screens.map((src, i) => {
          const offset =
            ((i - active + screens.length) % screens.length);

          // нормализуем: 0 = center, 1 = right, last = left
          const position =
            offset === 0
              ? 0
              : offset === 1
              ? 1
              : -1;

          return (
            <Slide
              key={src}
              src={src}
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
}

function Slide({
  src,
  position,
}: {
  src: string;
  position: -1 | 0 | 1;
}) {
  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      animate={{
        x: position === 0 ? "0%" : position === -1 ? "-6%" : "6%",
        scale: position === 0 ? 1 : 0.95,
        opacity: position === 0 ? 1 : 0.55,
        zIndex: position === 0 ? 5 : 1,
      }}
      transition={{
        duration: SLIDE_DURATION,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform" }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
      />
    </motion.div>
  );
}