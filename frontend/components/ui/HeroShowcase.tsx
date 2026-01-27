"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const AUTO_DELAY = 6000;
const DURATION = 1.6;

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
          requestAnimationFrame(() => setLoaded(true));
        }
      };
    });
  }, [srcs]);

  return loaded;
}

/* ---------------- component ---------------- */

export default function HeroShowcase() {
  const ready = useImagesLoaded(screens);
  const controls = useAnimationControls();

  const [index, setIndex] = useState(0);

  const prev = (index - 1 + screens.length) % screens.length;
  const next = (index + 1) % screens.length;

  // стартовое положение — БЕЗ анимации
  useEffect(() => {
    if (!ready) return;

    controls.set({ x: "-100%" });

    const id = setInterval(async () => {
      await controls.start({
        x: "-200%",
        transition: {
          duration: DURATION,
          ease: [0.22, 0.61, 0.36, 1],
        },
      });

      // после слайда — мгновенно возвращаемся
      controls.set({ x: "-100%" });
      setIndex((i) => (i + 1) % screens.length);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [ready]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* viewport */}
      <div className="relative h-[420px] overflow-hidden rounded-3xl">
        {/* track */}
        <motion.div
          className="flex h-full"
          animate={controls}
          style={{ width: "300%" }}
        >
          <Card src={screens[prev]} />
          <Card src={screens[index]} active />
          <Card src={screens[next]} />
        </motion.div>

        {/* gradient masks */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- card ---------------- */

function Card({ src, active = false }: { src: string; active?: boolean }) {
  return (
    <div className="flex w-full items-center justify-center">
      <motion.div
        className="
          w-[90%] h-full
          rounded-3xl
          border border-zinc-800
          bg-zinc-900
          overflow-hidden
        "
        animate={{
          scale: active ? 1 : 0.94,
          opacity: active ? 1 : 0.6,
        }}
        transition={{
          duration: DURATION,
          ease: "easeOut",
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      </motion.div>
    </div>
  );
}