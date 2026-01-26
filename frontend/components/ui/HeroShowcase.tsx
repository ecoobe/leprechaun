"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Предзагрузка изображений
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadImages = async () => {
      const promises = screens.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
      });

      try {
        await Promise.all(promises);
        setTimeout(() => setIsReady(true), 300);
      } catch (error) {
        console.error("Failed to preload images:", error);
        setIsReady(true);
      }
    };

    preloadImages();
  }, []);

  // Функции навигации
  const goToNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % screens.length);
  }, []);

  const goToPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + screens.length) % screens.length);
  }, []);

  // Автопрокрутка
  useEffect(() => {
    if (!isReady) return;

    intervalRef.current = setInterval(goToNext, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isReady, goToNext]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!intervalRef.current && isReady) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
  };

  // Вычисляем индексы соседних карточек
  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Фоновое свечение */}
      <motion.div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Контейнер для всей карусели */}
      <div className="relative h-[420px] rounded-3xl overflow-visible">
        {!isReady ? (
          <HeroLoader />
        ) : (
          <>
            {/* Индикаторы прогресса */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="relative"
                >
                  <div className="w-2 h-2 rounded-full bg-zinc-700 transition-all duration-300" />
                  <motion.div
                    className="absolute top-0 left-0 w-2 h-2 rounded-full bg-emerald-500"
                    animate={{
                      scale: i === index ? 1.5 : 1,
                      opacity: i === index ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>
              ))}
            </div>

            {/* Основная карусель */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Левая карточка (предыдущая) - видна только краем слева */}
              <motion.div
                className="absolute left-0 w-[85%] h-[90%] rounded-2xl overflow-hidden border border-zinc-800/30 bg-zinc-900/60 backdrop-blur-sm shadow-xl"
                initial={{ x: "-90%", opacity: 0.4 }}
                animate={{ x: "-85%", opacity: 0.6 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  delay: 0.1 
                }}
                style={{
                  zIndex: 10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
                onClick={goToPrev}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent z-10" />
                  <img
                    src={screens[prevIndex]}
                    alt="Предыдущий интерфейс"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Центральная карточка (активная) */}
              <motion.div
                key={index}
                className="absolute w-[90%] h-[95%] rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                style={{
                  zIndex: 20,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.15)",
                }}
              >
                <div className="relative w-full h-full">
                  {/* Градиентная рамка */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Изображение */}
                  <img
                    src={screens[index]}
                    alt="Текущий интерфейс Leprechaun"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Правая карточка (следующая) - видна только краем справа */}
              <motion.div
                className="absolute right-0 w-[85%] h-[90%] rounded-2xl overflow-hidden border border-zinc-800/30 bg-zinc-900/60 backdrop-blur-sm shadow-xl"
                initial={{ x: "90%", opacity: 0.4 }}
                animate={{ x: "85%", opacity: 0.6 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  delay: 0.1 
                }}
                style={{
                  zIndex: 10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
                onClick={goToNext}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-l from-zinc-900/80 to-transparent z-10" />
                  <img
                    src={screens[nextIndex]}
                    alt="Следующий интерфейс"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Стрелки для навигации - минималистичные и видимые */}
              <button
                onClick={goToPrev}
                className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center group"
                aria-label="Предыдущий слайд"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center group-hover:bg-zinc-800/90 group-hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
                  <svg 
                    className="w-5 h-5 text-zinc-300 group-hover:text-emerald-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md group-hover:bg-emerald-500/20 transition-all duration-300" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center group"
                aria-label="Следующий слайд"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center group-hover:bg-zinc-800/90 group-hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
                  <svg 
                    className="w-5 h-5 text-zinc-300 group-hover:text-emerald-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md group-hover:bg-emerald-500/20 transition-all duration-300" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Подпись под каруселью */}
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-400">
          Перетащите или используйте стрелки для просмотра интерфейсов
        </p>
      </div>

      {/* Тень под компонентом */}
      <motion.div 
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-emerald-500/10 blur-xl rounded-full"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroLoader() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative mb-4"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          },
          scale: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }
        }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20" />
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-emerald-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear"
          }}
        />
      </motion.div>
      <motion.p 
        className="text-sm text-zinc-400 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Загружаем интерфейс...
      </motion.p>
    </motion.div>
  );
}