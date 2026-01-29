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
    <section className="relative w-full flex items-center justify-center">
      {/* SCALE CONTAINER — увеличивает объекты */}
      <div className="relative scale-150">

        {/* HAND — под шляпой */}
        <motion.div
          style={{ x: handX }}
          className="absolute bottom-[-10px] left-[69%] -translate-x-1/2 z-0"
        >
          <Image
            src="/hand.png"
            alt="Leprechaun hand"
            width={300}   // сделали больше
            height={200}  // сделали пропорционально
            priority
          />
        </motion.div>

        {/* HAT — сверху */}
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