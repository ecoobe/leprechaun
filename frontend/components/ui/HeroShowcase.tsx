"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // Анимация смещения руки
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // Поворот шляпы
  const hatRotate = useTransform(scrollY, [0, 300], [0, -12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="relative">

        {/* HAND — рука под шляпой */}
        <motion.div
          style={{ x: handX }}
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
            width={330}   // увеличили, чтобы соответствовало scale-150
            height={210}  // пропорционально
            priority
          />
        </motion.div>

        {/* HAT — шляпа сверху */}
        <motion.div
          style={{ rotate: hatRotate }}
          className="relative z-10 origin-bottom-left"
        >
          <Image
            src="/hat.png"
            alt="Leprechaun hat"
            width={480}   // увеличили, чтобы соответствовало scale-150
            height={330}  // пропорционально
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}