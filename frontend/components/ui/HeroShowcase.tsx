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

/* ---------------- utils ---------------- */

function useImagesLoaded(srcs: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let count = 0;

    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        count++;
        if (count === srcs.length) {
          requestAnimationFrame(() => {
            setLoaded(true);
          });
        }
      };
    });
  }, [srcs]);

  return loaded;
}

/* ---------------- component ---------------- */

export default function HeroShowcase() {
  const imagesReady = useImagesLoaded(screens);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!imagesReady) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % screens.length);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [imagesReady]);

  return (
    <motion.div
      className="relative w-full max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: imagesReady ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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
              ready={imagesReady}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function Slide({
  src,
  position,
  ready,
}: {
  src: string;
  position: -1 | 0 | 1;
  ready: boolean;
}) {
  const isCenter = position === 0;

  const state = {
    x: isCenter ? "0%" : position === -1 ? "-7%" : "7%",
    scale: isCenter ? 1 : 0.96,
    opacity: isCenter ? 1 : 0.55,
    rotateY: isCenter ? 0 : position === -1 ? 2 : -2,
    zIndex: isCenter ? 5 : 1,
  };

  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      initial={ready ? state : false} // 👈 старт = текущему состоянию
      animate={state}
      transition={{
        duration: DURATION,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
        initial={{ scale: 1 }}
        animate={{ scale: isCenter ? 1.01 : 1 }}
        transition={{
          duration: DURATION + 0.2,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}