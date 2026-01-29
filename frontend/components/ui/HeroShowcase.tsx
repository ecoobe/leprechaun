"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // Рука уезжает влево при скролле
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // Шляпа наклоняется при скролле
  const hatRotate = useTransform(scrollY, [0, 300], [0, -12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="relative">

        {/* HAND */}
        <motion.div
          style={{ x: handX }}
          className="absolute bottom-[-10px] left-[69%] -translate-x-1/2 z-0"
        >
          <motion.img
            src="/hand.png"
            alt="Leprechaun hand"
            width={220}
            height={140}
            style={{ scale: 1.5 }} // теперь точно масштабируется
          />
        </motion.div>

        {/* HAT */}
        <motion.div
          style={{ rotate: hatRotate }}
          className="relative z-10 origin-bottom-left"
        >
          <motion.img
            src="/hat.png"
            alt="Leprechaun hat"
            width={320}
            height={220}
            style={{ scale: 1.5 }}
          />
        </motion.div>

      </div>
    </section>
  );
}