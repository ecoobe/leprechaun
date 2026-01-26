"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Простая предзагрузка
    const loadImages = () => {
      screens.forEach(src => {
        new Image().src = src;
      });
      setIsReady(true);
    };
    loadImages();
  }, []);

  // Плавное переключение
  const goToNext = () => {
    setIndex(prev => (prev + 1) % screens.length);
  };

  const goToPrev = () => {
    setIndex(prev => (prev - 1 + screens.length) % screens.length);
  };

  if (!isReady) {
    return (
      <div className="relative w-full max-w-2xl mx-auto h-[420px] rounded-2xl bg-zinc-900/50 border border-zinc-800/50 animate-pulse" />
    );
  }

  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Основная карточка */}
      <div className="relative h-[420px]">
        {/* Задние карточки - видно только края 5% */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[5%] h-[95%] rounded-l-2xl overflow-hidden border-l border-y border-zinc-800/30 bg-zinc-900/80 z-10"
          initial={false}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={screens[prevIndex]}
            alt="Предыдущий"
            className="w-full h-full object-cover object-left"
          />
        </motion.div>

        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[5%] h-[95%] rounded-r-2xl overflow-hidden border-r border-y border-zinc-800/30 bg-zinc-900/80 z-10"
          initial={false}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={screens[nextIndex]}
            alt="Следующий"
            className="w-full h-full object-cover object-right"
          />
        </motion.div>

        {/* Основная карточка */}
        <motion.div
          key={index}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/90 backdrop-blur-sm z-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // Плавный ease
          }}
        >
          <img
            src={screens[index]}
            alt="Интерфейс Leprechaun"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Минималистичные стрелки */}
        <button
          onClick={goToPrev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 text-zinc-400 hover:text-emerald-400 transition-colors"
          aria-label="Предыдущий"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 text-zinc-400 hover:text-emerald-400 transition-colors"
          aria-label="Следующий"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Индикаторы */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors"
            >
              {i === index && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  layoutId="activeDot"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}