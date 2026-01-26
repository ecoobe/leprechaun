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
  const [direction, setDirection] = useState(1); // 1 = вперед, -1 = назад
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Предзагрузка изображений с правильным созданием Image
  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') return;

    const preloadImages = async () => {
      const promises = screens.map((src) => {
        return new Promise((resolve, reject) => {
          // Создаем Image правильно для браузера
          const img = new window.Image(); // Используем window.Image
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
      });

      try {
        await Promise.all(promises);
        // Даём дополнительное время для стабилизации рендера
        setTimeout(() => setIsReady(true), 300);
      } catch (error) {
        console.error("Failed to preload images:", error);
        setIsReady(true); // Все равно продолжаем
      }
    };

    preloadImages();
  }, []);

  // Плавное переключение с учетом направления
  const goToNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % screens.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + screens.length) % screens.length);
  }, []);

  // Автопрокрутка с паузой при наведении
  useEffect(() => {
    if (!isReady) return;

    const startInterval = () => {
      intervalRef.current = setInterval(goToNext, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      goToNext();
    } else if (swipe > swipeConfidenceThreshold) {
      goToPrev();
    }
  };

  return (
    <div 
      className="relative w-full max-w-xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Фоновое свечение */}
      <motion.div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 blur-3xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Контейнер */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden">
        {!isReady ? (
          <HeroLoader />
        ) : (
          <>
            {/* Индикаторы */}
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

            {/* Основная карусель */}
            <div className="relative w-full h-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl"
                  style={{
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)",
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
                      alt="Интерфейс Leprechaun"
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                      loading="eager"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Кнопки навигации */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center hover:bg-zinc-800/90 transition-all duration-300 group"
                aria-label="Предыдущий слайд"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center hover:bg-zinc-800/90 transition-all duration-300 group"
                aria-label="Следующий слайд"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Тень под компонентом */}
      <motion.div 
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-emerald-500/10 blur-xl rounded-full"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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