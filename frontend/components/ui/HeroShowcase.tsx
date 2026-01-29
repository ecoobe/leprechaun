"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // HAND — уходит влево при скролле
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // HAT — поворот "накрывающий"
  const hatRotate = useTransform(scrollY, [0, 300], [0, -12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="relative scale-150">

        {/* HAND */}
        <motion.div
          style={{ x: handX }}
          className="absolute bottom-[20px] left-[69%] -translate-x-1/2 z-0"
        >
          <Image
            src="/hand.png"
            alt="Leprechaun hand"
            width={220}
            height={140}
            priority
          />
        </motion.div>

        {/* HAT */}
        <motion.div
          style={{ rotate: hatRotate }}
          className="relative z-10 origin-bottom-left"
        >
          <Image
            src="/hat.png"
            alt="Leprechaun hat"
            width={320}
            height={220}
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}