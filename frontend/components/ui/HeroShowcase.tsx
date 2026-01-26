"use client";

import { motion, useAnimation, PanInfo } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

const screens = [
  "/screens/dashboard.png",
  "/screens/reminders.png",
  "/screens/stats.png",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mainControls = useAnimation();
  const leftControls = useAnimation();
  const rightControls = useAnimation();

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
        setTimeout(() => setIsReady(true), 400);
      } catch (error) {
        console.error("Failed to preload images:", error);
        setIsReady(true);
      }
    };

    preloadImages();
  }, []);

  // Супер-плавное переключение
  const goToNext = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Анимация ухода текущей карточки влево и появления новой справа
    await Promise.all([
      mainControls.start({
        x: -100,
        opacity: 0,
        scale: 0.95,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98], // Очень плавная кривая
          duration: 0.8,
        }
      }),
      rightControls.start({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98],
          duration: 0.8,
        }
      }),
      leftControls.start({
        x: "-90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.8,
        }
      })
    ]);
    
    // Обновляем индекс
    setIndex((prev) => (prev + 1) % screens.length);
    
    // Плавный возврат к начальному состоянию
    await Promise.all([
      mainControls.start({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98],
          duration: 0.6,
        }
      }),
      leftControls.start({
        x: "-90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.6,
        }
      }),
      rightControls.start({
        x: "90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.6,
        }
      })
    ]);
    
    setIsAnimating(false);
  }, [mainControls, leftControls, rightControls, isAnimating]);

  const goToPrev = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Анимация ухода текущей карточки вправо и появления новой слева
    await Promise.all([
      mainControls.start({
        x: 100,
        opacity: 0,
        scale: 0.95,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98],
          duration: 0.8,
        }
      }),
      leftControls.start({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98],
          duration: 0.8,
        }
      }),
      rightControls.start({
        x: "90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.8,
        }
      })
    ]);
    
    // Обновляем индекс
    setIndex((prev) => (prev - 1 + screens.length) % screens.length);
    
    // Плавный возврат к начальному состоянию
    await Promise.all([
      mainControls.start({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          ease: [0.32, 0.72, 0.38, 0.98],
          duration: 0.6,
        }
      }),
      leftControls.start({
        x: "-90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.6,
        }
      }),
      rightControls.start({
        x: "90%",
        opacity: 0.05,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.6,
        }
      })
    ]);
    
    setIsAnimating(false);
  }, [mainControls, leftControls, rightControls, isAnimating]);

  // Автопрокрутка
  useEffect(() => {
    if (!isReady || isAnimating) return;

    intervalRef.current = setInterval(goToNext, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isReady, goToNext, isAnimating]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!intervalRef.current && isReady && !isAnimating) {
      intervalRef.current = setInterval(goToNext, 5000);
    }
  };

  // Drag для переключения
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 30;
    const velocityThreshold = 300;
    
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
      if (info.offset.x > 0 || info.velocity.x > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  // Вычисляем индексы соседних карточек
  const prevIndex = (index - 1 + screens.length) % screens.length;
  const nextIndex = (index + 1) % screens.length;

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Фоновое свечение */}
      <motion.div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/3 to-indigo-500/3 blur-3xl"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Контейнер для всей карусели */}
      <div className="relative h-[420px]">
        {!isReady ? (
          <HeroLoader />
        ) : (
          <>
            {/* Индикаторы прогресса */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const direction = i > index ? 1 : -1;
                    direction > 0 ? goToNext() : goToPrev();
                  }}
                  className="relative focus:outline-none"
                  disabled={isAnimating}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 transition-all duration-300" />
                  <motion.div
                    className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-500"
                    animate={{
                      scale: i === index ? 1.8 : 1,
                      opacity: i === index ? 1 : 0,
                    }}
                    transition={{ 
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.4
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Основная карусель */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Левая карточка (предыдущая) - виден только краешек 5% */}
              <motion.div
                className="absolute left-0 w-[15%] h-[88%] rounded-l-2xl overflow-hidden border-l border-y border-zinc-800/20 bg-zinc-900/30 backdrop-blur-sm cursor-pointer"
                animate={leftControls}
                initial={{ x: "-90%", opacity: 0.05 }}
                style={{
                  zIndex: 5,
                  boxShadow: "inset 4px 0 8px -4px rgba(0,0,0,0.2)",
                }}
                onClick={goToPrev}
                whileHover={{ 
                  x: "-88%", 
                  opacity: 0.08,
                }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-transparent z-10" />
                  <img
                    src={screens[prevIndex]}
                    alt="Предыдущий интерфейс"
                    className="w-full h-full object-cover object-top scale-105 -translate-x-2"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Центральная карточка (активная) */}
              <motion.div
                className="relative w-[90%] h-[95%] rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl"
                animate={mainControls}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                style={{
                  zIndex: 10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1)",
                }}
                whileHover={{ 
                  scale: 1.002,
                }}
              >
                {/* Градиентная рамка */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)",
                  }}
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
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
              </motion.div>

              {/* Правая карточка (следующая) - виден только краешек 5% */}
              <motion.div
                className="absolute right-0 w-[15%] h-[88%] rounded-r-2xl overflow-hidden border-r border-y border-zinc-800/20 bg-zinc-900/30 backdrop-blur-sm cursor-pointer"
                animate={rightControls}
                initial={{ x: "90%", opacity: 0.05 }}
                style={{
                  zIndex: 5,
                  boxShadow: "inset -4px 0 8px -4px rgba(0,0,0,0.2)",
                }}
                onClick={goToNext}
                whileHover={{ 
                  x: "88%", 
                  opacity: 0.08,
                }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/95 via-zinc-950/80 to-transparent z-10" />
                  <img
                    src={screens[nextIndex]}
                    alt="Следующий интерфейс"
                    className="w-full h-full object-cover object-top scale-105 translate-x-2"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Минималистичные стрелки - только иконки */}
              <button
                onClick={goToPrev}
                className="absolute -left-4 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center group focus:outline-none"
                aria-label="Предыдущий слайд"
                disabled={isAnimating}
              >
                <div className="relative">
                  <motion.svg 
                    className="w-7 h-7 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ 
                      x: isAnimating ? -2 : 0 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 25 
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M15 19l-7-7 7-7" 
                    />
                  </motion.svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 blur-md"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute -right-4 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center group focus:outline-none"
                aria-label="Следующий слайд"
                disabled={isAnimating}
              >
                <div className="relative">
                  <motion.svg 
                    className="w-7 h-7 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ 
                      x: isAnimating ? 2 : 0 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 25 
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M9 5l7 7-7 7" 
                    />
                  </motion.svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 blur-md"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Тень под компонентом */}
      <motion.div 
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-emerald-500/5 blur-xl rounded-full"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroLoader() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-zinc-800/30 bg-zinc-900/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative mb-4"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          },
          scale: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        <div className="w-16 h-16 rounded-full border border-emerald-500/10" />
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-emerald-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
      </motion.div>
      <motion.p 
        className="text-sm text-zinc-400 font-medium"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Загружаем интерфейс...
      </motion.p>
    </motion.div>
  );
}