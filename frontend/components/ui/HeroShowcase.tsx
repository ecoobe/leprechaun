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
  const isCenter = position === 0;

  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      initial={{
        opacity: 0,
        scale: 0.9,
        x: position === -1 ? "-12%" : position === 1 ? "12%" : "0%",
        rotateY: position === -1 ? 6 : position === 1 ? -6 : 0,
      }}
      animate={{
        x: isCenter ? "0%" : position === -1 ? "-6%" : "6%",
        scale: isCenter ? 1 : 0.96,
        opacity: isCenter ? 1 : 0.55,
        rotateY: isCenter ? 0 : position === -1 ? 2.5 : -2.5,
        zIndex: isCenter ? 5 : 1,
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 70,     // 👈 мягче
          damping: 28,       // 👈 гасим дёрганье
          mass: 1.4,         // 👈 «тяжёлая» карточка
        },
        rotateY: {
          type: "spring",
          stiffness: 60,
          damping: 22,
        },
        scale: {
          duration: 1.4,
          ease: "easeOut",
        },
        opacity: {
          duration: 1.3,
          ease: "easeOut",
          delay: 0.08, // 👈 полностью убирает вспышку
        },
      }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* ПАРАЛЛАКС */}
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
        animate={{
          x: isCenter ? "0%" : position === -1 ? "3%" : "-3%",
          scale: isCenter ? 1.03 : 1,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 1.2,
          },
          scale: {
            duration: 1.6,
            ease: "easeOut",
          },
        }}
      />
    </motion.div>
  );
}