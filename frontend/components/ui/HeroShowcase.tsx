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
        
        {/* Тень под рукой */}
        <div
          className="absolute bottom-[0px] left-[69%] -translate-x-1/2 z-[-1] rounded-full"
          style={{
            width: '150px',
            height: '30px',
            background: 'rgba(0,0,0,0.25)',
            filter: 'blur(12px)',
            transform: 'translate(-20px, -10px) scaleX(1.2)',
          }}
        />

        {/* Glow позади шляпы */}
        <div
          className="absolute inset-0 z-[-2] rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0,188,124,0.3) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(80px)',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* HAND — под шляпой */}
        <motion.img
          src="/hand.png"
          alt="Leprechaun hand"
          width={220}
          height={140}
          className="absolute bottom-[10px] left-[69%] -translate-x-1/2 z-0 origin-bottom"
          style={{
            x: handX,
            willChange: 'transform', // GPU hint
          }}
        />

        {/* HAT — сверху, опущена */}
        <motion.img
          src="/hat.png"
          alt="Leprechaun hat"
          width={320}
          height={220}
          className="relative z-10 origin-bottom-left"
          style={{
            rotate: hatRotate,
            marginBottom: '-45px',
            willChange: 'transform', // GPU hint
          }}
        />

      </div>
    </section>
  );
}