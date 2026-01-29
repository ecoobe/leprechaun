"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HAT_SRC = "/hat.png";

/* preload */
function useImageReady(src: string) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      requestAnimationFrame(() => setReady(true));
    };
  }, [src]);

  return ready;
}

export default function HeroHat() {
  const ready = useImageReady(HAT_SRC);

  if (!ready) return null; // вообще ничего не рендерим до загрузки

  return (
    <div className="relative w-full max-w-xl mx-auto h-[420px] flex items-center justify-center">
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

      <motion.img
        src={HAT_SRC}
        alt="Leprechaun hat"
        draggable={false}
        initial={false}
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 1.2, 0],
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="
          relative
          w-[320px]
          select-none
          will-change-transform
        "
      />
    </div>
  );
}