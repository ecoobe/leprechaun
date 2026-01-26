"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const SLIDE_DURATION = 1.8; // Увеличенная длительность для плавности
const AUTO_DELAY = 7000; // Увеличенная задержка

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
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative h-[420px] overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <Slide key={`prev-${prevIndex}`} src={screens[prevIndex]} position="left" />
            <Slide
              key={`active-${index}`}
              src={screens[index]}
              position="center"
              direction={direction}
            />
            <Slide key={`next-${nextIndex}`} src={screens[nextIndex]} position="right" />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Slide({
  src,
  position,
  direction,
}: {
  src: string;
  position: "left" | "center" | "right";
  direction?: 1 | -1;
}) {
  const variants = {
    left: {
      x: "-32%",
      scale: 0.88,
      opacity: 0.6,
      zIndex: 1,
    },
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 5,
    },
    right: {
      x: "32%",
      scale: 0.88,
      opacity: 0.6,
      zIndex: 1,
    },
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? "100%" : "-100%",
      scale: 0.9,
      opacity: 0,
    }),
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? "-100%" : "100%",
      scale: 0.9,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="absolute w-[85%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      custom={direction}
      variants={variants}
      initial={position === "center" ? "enter" : position}
      animate={position}
      exit="exit"
      transition={{
        duration: SLIDE_DURATION,
        ease: [0.25, 0.46, 0.45, 0.94], // Более плавная кривая
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