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

  // Автоперелистывание
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Предзагрузка
  useEffect(() => {
    screens.forEach(src => {
      new Image().src = src;
    });
    setIsReady(true);
  }, []);

  const goToNext = () => {
    setIndex(prev => (prev + 1) % screens.length);
  };

  const goToPrev = () => {
    setIndex(prev => (prev - 1 + screens.length) % screens.length);
  };

  if (!isReady) {
    return (
      <div className="relative w-full max-w-2xl mx-auto h-[420px] rounded-2xl bg-zinc-900/50 border border-zinc-800/50" />
    );
  }

  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  return (
    <div className="relative w-full max-w-2xl mx-auto px-12">
      {/* Контейнер карусели */}
      <div className="relative h-[420px] overflow-hidden">
        
        {/* Задние карточки (видны на 5% с каждой стороны) */}
        <div className="absolute inset-0 flex items-center">
          {/* Левая задняя карточка */}
          <div className="absolute left-0 w-[5%] h-[85%] rounded-l-xl overflow-hidden z-10">
            <div className="w-full h-full bg-gradient-to-r from-zinc-900 to-transparent absolute z-10" />
            <img
              src={screens[prevIndex]}
              alt="Предыдущий"
              className="w-full h-full object-cover object-left"
            />
          </div>

          {/* Правая задняя карточка */}
          <div className="absolute right-0 w-[5%] h-[85%] rounded-r-xl overflow-hidden z-10">
            <div className="w-full h-full bg-gradient-to-l from-zinc-900 to-transparent absolute z-10" />
            <img
              src={screens[nextIndex]}
              alt="Следующий"
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>

        {/* Основная карточка */}
        <motion.div
          key={index}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/90 z-20"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeInOut"
          }}
        >
          <img
            src={screens[index]}
            alt="Интерфейс Leprechaun"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Стрелки */}
        <button
          onClick={goToPrev}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 text-zinc-400 hover:text-emerald-400 transition-colors"
          aria-label="Предыдущий"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 text-zinc-400 hover:text-emerald-400 transition-colors"
          aria-label="Следующий"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Индикаторы */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors"
            >
              {i === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-500"
                  layoutId="activeDot"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}