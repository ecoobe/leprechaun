"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollY } = useScroll();

  // Анимация смещения руки влево при скролле
  const handX = useTransform(scrollY, [0, 300], [0, -60]);

  // Анимация наклона шляпы при скролле
  const hatRotate = useTransform(scrollY, [0, 300], [0, -12]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      {/* Контейнер без scale */}
      <div className="relative">
        
        {/* HAND — рука под шляпой */}
        <motion.div
          style={{ x: handX }} // смещение по X при скролле
          className="
            absolute
            bottom-[-10px]     // регулирует вертикальное положение
            left-[69%]         // горизонтальное положение
            -translate-x-1/2   // центрирование относительно left
            z-0                // под шляпой
          "
        >
          <Image
            src="/hand.png"
            alt="Leprechaun hand"
            width={220}
            height={140}
            priority
            style={{ scale: 1.5 }} // Масштабируем руку как в статике
          />
        </motion.div>

        {/* HAT — шляпа сверху */}
        <motion.div
          style={{ rotate: hatRotate }} // наклон при скролле
          className="relative z-10 origin-bottom-left"
        >
          <Image
            src="/hat.png"
            alt="Leprechaun hat"
            width={320}
            height={220}
            priority
            style={{ scale: 1.5 }} // Масштаб шляпы как в статике
          />
        </motion.div>

      </div>
    </section>
  );
}