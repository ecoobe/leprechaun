"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

const TRANSITION_CONFIG = {
  duration: 1.6,
  ease: [0.32, 0.72, 0, 1], // Очень плавная кривая
};

const AUTO_DELAY = 6500;

export default function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setIndex((i) => (i + 1) % screens.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setIndex((i) => (i - 1 + screens.length) % screens.length);
  }, [isAnimating]);

  // Автопрокрутка с паузой во время анимации
  useEffect(() => {
    const id = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [handleNext, isAnimating]);

  // Сброс флага анимации
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_CONFIG.duration * 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />
      
      {/* Контейнер с индикаторами */}
      <div className="absolute -top-8 left-0 right-0 flex justify-center gap-2 z-10">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className="relative group"
            disabled={isAnimating}
            aria-label={`Перейти к слайду ${i + 1}`}
          >
            <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-zinc-500 transition-colors" />
            {i === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-emerald-500"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={handlePrev}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center hover:bg-black/50 hover:border-zinc-500/50 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Предыдущий слайд"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center hover:bg-black/50 hover:border-zinc-500/50 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Следующий слайд"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative h-[420px] overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence
            initial={false}
            mode="popLayout"
            custom={direction}
            onExitComplete={() => setIsAnimating(false)}
          >
            {/* Левый слайд */}
            <Slide
              key={`prev-${prevIndex}`}
              src={screens[prevIndex]}
              position="left"
              isActive={false}
            />
            
            {/* Центральный слайд */}
            <Slide
              key={`active-${index}`}
              src={screens[index]}
              position="center"
              direction={direction}
              isActive={true}
            />
            
            {/* Правый слайд */}
            <Slide
              key={`next-${nextIndex}`}
              src={screens[nextIndex]}
              position="right"
              isActive={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Slide({
  src,
  position,
  direction,
  isActive,
}: {
  src: string;
  position: "left" | "center" | "right";
  direction?: 1 | -1;
  isActive: boolean;
}) {
  const variants = {
    left: {
      x: "-8%",
      scale: 0.85,
      opacity: 0.7,
      zIndex: 2,
      filter: "brightness(0.8) blur(0.5px)",
      rotateY: -15,
    },
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 5,
      filter: "brightness(1) blur(0px)",
      rotateY: 0,
    },
    right: {
      x: "8%",
      scale: 0.85,
      opacity: 0.7,
      zIndex: 2,
      filter: "brightness(0.8) blur(0.5px)",
      rotateY: 15,
    },
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? "100%" : "-100%",
      scale: 0.9,
      opacity: 0,
      filter: "brightness(0.7) blur(2px)",
      rotateY: dir === 1 ? 30 : -30,
    }),
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? "-100%" : "100%",
      scale: 0.9,
      opacity: 0,
      filter: "brightness(0.7) blur(2px)",
      rotateY: dir === 1 ? -30 : 30,
    }),
  };

  return (
    <motion.div
      className="absolute w-[85%] h-full rounded-[2rem] border border-zinc-800/50 bg-zinc-900/90 overflow-hidden shadow-2xl"
      custom={direction}
      variants={variants}
      initial={position === "center" ? "enter" : position}
      animate={position}
      exit="exit"
      transition={{
        ...TRANSITION_CONFIG,
        rotateY: { duration: TRANSITION_CONFIG.duration * 0.8 },
        filter: { duration: TRANSITION_CONFIG.duration * 0.5 },
      }}
      style={{
        willChange: "transform, opacity, filter",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      whileHover={isActive ? { scale: 1.02 } : {}}
    >
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="w-full h-full object-cover select-none"
          loading="lazy"
        />
      </motion.div>
      
      {/* Светящийся край для активного слайда */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(16, 185, 129, 0.3)",
          }}
        />
      )}
    </motion.div>
  );
}