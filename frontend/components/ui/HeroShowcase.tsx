"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroShowcase() {
  const { scrollYProgress } = useScroll();

  // Рука: уходит ВЛЕВО под шляпу
  const handX = useTransform(scrollYProgress, [0, 0.4], ["-50%", "-75%"]);

  // Шляпа: накрывает руку
  const hatRotate = useTransform(scrollYProgress, [0, 0.4], ["0deg", "-12deg"]);

  return (
    <section className="relative w-full flex items-center justify-center h-[400px]">
      <div className="relative scale-150">

        {/* HAND */}
        <motion.div
          style={{ left: handX }}
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