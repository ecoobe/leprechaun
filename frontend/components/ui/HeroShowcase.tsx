"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const SLIDE_DURATION = 1.6;
const AUTO_DELAY = 6000;

export default function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % screens.length);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* мягкое свечение */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative h-[420px]">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <Slide src={screens[prevIndex]} position="left" />
          <Slide src={screens[index]} position="center" />
          <Slide src={screens[nextIndex]} position="right" />
        </div>
      </div>
    </div>
  );
}

function Slide({
  src,
  position,
}: {
  src: string;
  position: "left" | "center" | "right";
}) {
  const variants = {
    left: {
      x: "-6%",
      scale: 0.95,
      opacity: 0.55,
      zIndex: 1,
    },
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 5,
    },
    right: {
      x: "6%",
      scale: 0.95,
      opacity: 0.55,
      zIndex: 1,
    },
  };

  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      variants={variants}
      animate={position}
      initial={false}
      transition={{
        duration: SLIDE_DURATION,
        ease: [0.22, 1, 0.36, 1], // ultra-smooth (easeOutCubic++)
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