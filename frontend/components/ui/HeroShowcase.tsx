"use client";

import Image from "next/image";
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

        {/* HAND — рука под шляпой */}
        <motion.div
          style={{ x: handX, scale: 1.5 }} // Масштабируем прямо motion.div
          className="
            absolute
            bottom-[-10px]     
            left-[69%]         
            -translate-x-1/2   
            z-0                
          "
        >
          <Image
            src="/hand.png"
            alt="Leprechaun hand"
            width={220}
            height={140}
            priority
          />
        </motion.div>

        {/* HAT — шляпа сверху */}
        <motion.div
          style={{ rotate: hatRotate, scale: 1.5 }} // Масштаб шляпы на том же уровне
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