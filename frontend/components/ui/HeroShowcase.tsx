"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  const handX = useTransform(scrollY, [0, 300], [0, -60]);
  const hatRotate = useTransform(scrollY, [0, 300], [0, 12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-visible">
      <div className="relative scale-150 pb-[60px]">

        <motion.img
          src="/hand.png"
          alt="Leprechaun hand"
          width={220}
          height={140}
          className="absolute bottom-[10px] left-[69%] -translate-x-1/2 z-0 origin-bottom"
          style={{ x: handX, willChange: "transform" }}
        />

        <motion.img
          src="/hat.png"
          alt="Leprechaun hat"
          width={320}
          height={220}
          className="relative z-10 origin-bottom-left -mb-[45px]"
          style={{ rotate: hatRotate, willChange: "transform" }}
        />
      </div>
    </section>
  );
}