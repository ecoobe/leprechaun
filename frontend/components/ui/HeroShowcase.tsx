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
  const [isReady, setIsReady] = useState(false);

  // контролируем "готовность"
  useEffect(() => {
    const readyTimeout = setTimeout(() => {
      setIsReady(true);
    }, 600); // даём UI стабилизироваться

    return () => clearTimeout(readyTimeout);
  }, []);

  // автопрокрутка ТОЛЬКО когда готовы
  useEffect(() => {
    if (!isReady) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 6000); // медленнее и спокойнее

    return () => clearInterval(id);
  }, [isReady]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl" />

      <div className="relative h-[420px]">
        {!isReady && <HeroLoader />}

        {isReady &&
          screens.map((src, i) => {
            const position =
              (i - index + screens.length) % screens.length;

            if (position > 2) return null;

            return (
              <motion.div
                key={src}
                className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur overflow-hidden"
                initial={false}
                animate={{
                  x: position * 48,
                  scale: 1 - position * 0.07,
                  opacity: 1 - position * 0.28,
                }}
                transition={{
                  duration: 1.2, // 🔥 плавно
                  ease: [0.16, 1, 0.3, 1], // ultra-smooth
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

function HeroLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
}