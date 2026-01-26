"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const AUTO_DELAY = 6000;
const DURATION = 1.8;

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

      <div className="relative h-[420px] flex items-center justify-center">
        {screens.map((src, i) => {
          const offset = (i - active + screens.length) % screens.length;

          const position =
            offset === 0 ? 0 : offset === 1 ? 1 : -1;

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
  const isCenter = position === 0;

  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      animate={{
        x: isCenter ? "0%" : position === -1 ? "-7%" : "7%",
        scale: isCenter ? 1 : 0.96,
        opacity: isCenter ? 1 : 0.55,
        rotateY: isCenter ? 0 : position === -1 ? 2 : -2,
        zIndex: isCenter ? 5 : 1,
      }}
      transition={{
        duration: DURATION,
        ease: [0.22, 0.61, 0.36, 1], // 🔥 ultra-smooth cubic
      }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* КАРТИНКА БЕЗ ПЛАВАНИЯ */}
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
        animate={{
          scale: isCenter ? 1.01 : 1,
        }}
        transition={{
          duration: DURATION + 0.2,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}