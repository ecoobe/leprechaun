"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // Параллакс: рука уезжает влево
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // Параллакс: шляпа наклоняется по часовой стрелке
  const hatRotate = useTransform(scrollY, [0, 300], [0, 12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-visible">
      {/* SCALE CONTAINER */}
      <div className="relative scale-150" style={{ paddingBottom: '60px' }}>
        {/* HAND — под шляпой */}
        <motion.img
          src="/hand.png"
          alt="Leprechaun hand"
          width={220}
          height={140}
          className="absolute bottom-[10px] left-[69%] -translate-x-1/2 z-0"
          style={{
            x: handX,
            originX: 0.5,
            originY: 1
          }}
        />

        {/* HAT — сверху, опускаем вниз */}
        <motion.img
          src="/hat.png"
          alt="Leprechaun hat"
          width={320}
          height={220}
          className="relative z-10 origin-bottom-left"
          style={{
            rotate: hatRotate,
            originX: 0,
            originY: 1,
            marginBottom: '-45px' // смещаем вниз, чтобы опустить шляпу
          }}
        />
      </div>
    </section>
  );
}