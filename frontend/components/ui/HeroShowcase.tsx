"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroHatParallax() {
  const ref = useRef<HTMLDivElement>(null);

  // 📜 прогресс скролла секции
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* ---------------- hand ---------------- */

  const handY = useTransform(scrollYProgress, [0, 0.6], [0, 140]);
  const handScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const handOpacity = useTransform(scrollYProgress, [0.5, 0.75], [1, 0]);

  /* ---------------- hat ---------------- */

  const hatY = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const hatRotate = useTransform(scrollYProgress, [0, 0.6], [-6, -14]);
  const hatScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-[140vh] bg-gradient-to-b from-zinc-950 to-zinc-900 overflow-hidden"
    >
      {/* сцена */}
      <div className="sticky top-[20vh] h-[420px] flex items-center justify-center">
        <div className="relative w-[420px] h-[420px]">

          {/* 🖐 РУКА */}
          <motion.img
            src="/hand.png"
            alt=""
            draggable={false}
            className="absolute bottom-0 left-1/2 w-[340px] -translate-x-1/2 select-none"
            style={{
              y: handY,
              scale: handScale,
              opacity: handOpacity,
              zIndex: 10,
            }}
          />

          {/* 🎩 ШЛЯПА */}
          <motion.img
            src="/hat.png"
            alt=""
            draggable={false}
            className="absolute top-0 left-1/2 w-[380px] -translate-x-1/2 select-none"
            style={{
              y: hatY,
              rotateZ: hatRotate,
              scale: hatScale,
              zIndex: 20,
            }}
          />
        </div>
      </div>
    </section>
  );
}