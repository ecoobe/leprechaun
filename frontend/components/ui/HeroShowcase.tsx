"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const AUTO_DELAY = 6000;
const BASE_DURATION = 1.8;

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

type Phase = "idle" | "boot" | "run";

export default function HeroShowcase() {
  const imagesReady = useImagesLoaded(screens);

  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  // 🟢 мягкий запуск
  useEffect(() => {
    if (!imagesReady) return;

    const boot = setTimeout(() => {
      setPhase("boot");
      setActive((i) => (i + 1) % screens.length);

      // после первого перехода — нормальный режим
      setTimeout(() => {
        setPhase("run");
      }, BASE_DURATION * 1000);
    }, 160); // 2–3 кадра тишины

    return () => clearTimeout(boot);
  }, [imagesReady]);

  // 🟢 обычный автоплей
  useEffect(() => {
    if (phase !== "run") return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % screens.length);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [phase]);

  return (
    <motion.div
      className="relative w-full max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: imagesReady ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
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
              phase={phase}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---------------- slide ---------------- */

function Slide({
  src,
  position,
  phase,
}: {
  src: string;
  position: -1 | 0 | 1;
  phase: "idle" | "boot" | "run";
}) {
  const isCenter = position === 0;

  const duration =
    phase === "boot"
      ? BASE_DURATION * 2.2 // 🔥 супер-мягкий старт
      : BASE_DURATION;

  return (
    <motion.div
      className="absolute w-[90%] h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden"
      initial={false}
      animate={{
        x: isCenter ? "0%" : position === -1 ? "-7%" : "7%",
        scale: isCenter ? 1 : 0.96,
        rotateY: isCenter ? 0 : position === -1 ? 2 : -2,
        opacity: isCenter ? 1 : 0.55,
        zIndex: isCenter ? 5 : 1,
      }}
      transition={{
        x: {
          duration,
          ease: [0.16, 0.84, 0.44, 1], // 🧈 buttery
        },
        scale: {
          duration: duration + 0.2,
          ease: "easeOut",
        },
        rotateY: {
          duration: duration + 0.3,
          ease: "easeOut",
        },
        opacity: {
          duration: duration + 0.6,
          ease: "easeOut",
        },
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
        initial={false}
        animate={{ scale: isCenter ? 1.015 : 1 }}
        transition={{
          duration: duration + 0.4,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}