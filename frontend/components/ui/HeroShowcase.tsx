"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [direction, setDirection] = useState(1);
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
    setDirection(1);
    setIndex((prev) => (prev + 1) % screens.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + screens.length) % screens.length);
  }, []);

  // Автопрокрутка
  useEffect(() => {
    if (!isReady) return;

    intervalRef.current = setInterval(goToNext, 5000);

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
      intervalRef.current = setInterval(goToNext, 5000);
    }
  };

  // Варианты анимации для карточек
  const getCardStyle = (cardIndex: number) => {
    const diff = cardIndex - index;
    const absDiff = Math.abs(diff);
    
    if (absDiff > 1) return { display: "none" };
    
    return {
      x: diff * 40, // Сдвиг для задних карточек
      scale: 1 - absDiff * 0.1, // Уменьшение масштаба
      opacity: 1 - absDiff * 0.3, // Прозрачность
      zIndex: 10 - absDiff, // Z-index
      pointerEvents: absDiff === 0 ? "auto" as const : "none" as const, // Кликабельность только для основной
    };
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Фоновое свечение */}
      <motion.div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Контейнер для карточек */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden">
        {!isReady ? (
          <HeroLoader />
        ) : (
          <>
            {/* Индикаторы прогресса */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
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

            {/* Карточки с анимацией */}
            <div className="relative w-full h-full">
              {screens.map((src, i) => {
                const style = getCardStyle(i);
                if (style.display === "none") return null;

                return (
                  <motion.div
                    key={`${src}-${i}`}
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl"
                    initial={false}
                    animate={{
                      x: style.x,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.3 },
                    }}
                    style={{
                      zIndex: style.zIndex,
                      pointerEvents: style.pointerEvents,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)",
                    }}
                    onClick={() => {
                      if (i !== index) {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }
                    }}
                  >
                    {/* Градиентная рамка */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: i === index 
                          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)"
                          : "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)",
                      }}
                      animate={{
                        opacity: i === index ? [0.3, 0.5, 0.3] : 0.2,
                      }}
                      transition={i === index ? {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      } : { duration: 0.3 }}
                    />
                    
                    {/* Изображение */}
                    <img
                      src={src}
                      alt="Интерфейс Leprechaun"
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Наложение на задние карточки для улучшения видимости */}
                    {i !== index && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                    )}
                  </motion.div>
                );
              })}

              {/* Минималистичные стрелки за краями */}
              <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between pointer-events-none">
                {/* Левая стрелка */}
                <button
                  onClick={goToPrev}
                  className="relative -left-12 w-8 h-8 flex items-center justify-center pointer-events-auto group"
                  aria-label="Предыдущий слайд"
                >
                  <div className="absolute inset-0 rounded-full bg-zinc-900/30 backdrop-blur-sm group-hover:bg-zinc-900/50 transition-all duration-300" />
                  <svg 
                    className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Правая стрелка */}
                <button
                  onClick={goToNext}
                  className="relative -right-12 w-8 h-8 flex items-center justify-center pointer-events-auto group"
                  aria-label="Следующий слайд"
                >
                  <div className="absolute inset-0 rounded-full bg-zinc-900/30 backdrop-blur-sm group-hover:bg-zinc-900/50 transition-all duration-300" />
                  <svg 
                    className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
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