"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Автоперелистывание
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const prevIndex = (currentIndex - 1 + screens.length) % screens.length;
  const nextIndex = (currentIndex + 1) % screens.length;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Контейнер для карусели */}
      <div className="relative h-[420px] mx-12">
        {/* Задние карточки (видны на 5% с каждой стороны) */}
        <div className="absolute inset-0 flex items-center">
          {/* Левая задняя карточка */}
          <div className="absolute left-0 w-[8%] h-[90%] rounded-l-xl overflow-hidden border-l border-y border-zinc-800/50 bg-zinc-900/80">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-transparent z-10" />
            <img
              src={screens[prevIndex]}
              alt="Предыдущий скриншот"
              className="w-full h-full object-cover object-left"
              draggable="false"
            />
          </div>

          {/* Правая задняя карточка */}
          <div className="absolute right-0 w-[8%] h-[90%] rounded-r-xl overflow-hidden border-r border-y border-zinc-800/50 bg-zinc-900/80">
            <div className="absolute inset-0 bg-gradient-to-l from-zinc-900 via-zinc-900/90 to-transparent z-10" />
            <img
              src={screens[nextIndex]}
              alt="Следующий скриншот"
              className="w-full h-full object-cover object-right"
              draggable="false"
            />
          </div>
        </div>

        {/* Основная карточка */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                x: direction === 1 ? 100 : -100,
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                x: direction === 1 ? -100 : 100,
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative w-[90%] h-[95%] rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/90 shadow-2xl"
            >
              <img
                src={screens[currentIndex]}
                alt={`Скриншот интерфейса ${currentIndex + 1}`}
                className="w-full h-full object-cover object-top"
                draggable="false"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Стрелки перелистывания */}
        <button
          onClick={goToPrev}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
          aria-label="Предыдущий скриншот"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
          aria-label="Следующий скриншот"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Индикаторы текущей карточки */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors relative"
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-500"
                  layoutId="activeIndicator"
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