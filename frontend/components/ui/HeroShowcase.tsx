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
      {/* Контейнер без масштабирования */}
      <div className="relative" style={{ paddingBottom: '60px' }}>

        {/* HAND — под шляпой */}
        <motion.div
          style={{
            x: handX,
            originX: 0.5,
            originY: 1,
            willChange: 'transform'
          }}
          className="absolute bottom-[10px] left-[69%] -translate-x-1/2 z-0"
        >
          <img
            src="/hand.png"
            alt="Leprechaun hand"
            width={220 * 1.5}  // масштабируем картинку вручную
            height={140 * 1.5} // чтобы сохранить пропорции
          />
        </motion.div>

        {/* HAT — сверху, опущена */}
        <motion.div
          style={{
            rotate: hatRotate,
            originX: 0,
            originY: 1,
            marginBottom: '-45px',
            willChange: 'transform'
          }}
          className="relative z-10"
        >
          <img
            src="/hat.png"
            alt="Leprechaun hat"
            width={320 * 1.5}  // масштабируем картинку вручную
            height={220 * 1.5} // чтобы сохранить пропорции
          />
        </motion.div>

      </div>
    </section>
  );
}