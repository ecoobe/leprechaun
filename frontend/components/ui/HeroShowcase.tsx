"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // Параллакс: рука уезжает влево
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // Параллакс: шляпа наклоняется
  const hatRotate = useTransform(scrollY, [0, 300], [0, -12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      {/* Контейнер с scale-150 — увеличивает объекты пропорционально */}
      <div className="relative scale-150">

        {/* HAND — под шляпой */}
        <motion.img
          src="/hand.png"
          alt="Leprechaun hand"
          width={220}
          height={140}
          className="absolute bottom-[-10px] left-[69%] -translate-x-1/2 z-0"
          style={{
            x: handX,            // параллакс по X
            originX: 0.5,        // transform-origin по центру X
            originY: 1           // transform-origin снизу
          }}
        />

        {/* HAT — сверху */}
        <motion.img
          src="/hat.png"
          alt="Leprechaun hat"
          width={320}
          height={220}
          className="relative z-10 origin-bottom-left"
          style={{
            rotate: hatRotate,   // наклон при скролле
            originX: 0,
            originY: 1
          }}
        />

      </div>
    </section>
  );
}