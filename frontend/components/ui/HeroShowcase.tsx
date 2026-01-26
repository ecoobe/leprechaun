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
  const controls = useAnimation();

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

  // Плавное переключение с debounce
  const goToNext = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setIndex((prev) => (prev + 1) % screens.length);
    
    // Плавная анимация с spring physics
    await controls.start({
      x: [-20, 0],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      }
    });
    
    setIsAnimating(false);
  }, [controls, isAnimating]);

  const goToPrev = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setIndex((prev) => (prev - 1 + screens.length) % screens.length);
    
    // Плавная анимация с spring physics
    await controls.start({
      x: [20, 0],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      }
    });
    
    setIsAnimating(false);
  }, [controls, isAnimating]);

  // Автопрокрутка с плавным интервалом
  useEffect(() => {
    if (!isReady || isAnimating) return;

    intervalRef.current = setInterval(goToNext, 4500);

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
      intervalRef.current = setInterval(goToNext, 4500);
    }
  };

  // Drag для переключения
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
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
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                  onClick={() => setIndex(i)}
                  className="relative focus:outline-none"
                  disabled={isAnimating}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 transition-all duration-300" />
                  <motion.div
                    className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-500"
                    animate={{
                      scale: i === index ? 1.8 : 1,
                      opacity: i === index ? 1 : 0,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 25,
                      duration: 0.3
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Основная карусель */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Левая карточка (предыдущая) - виден только краешек */}
              <motion.div
                className="absolute left-0 w-[20%] h-[88%] rounded-l-2xl overflow-hidden border-l border-y border-zinc-800/40 bg-zinc-900/60 backdrop-blur-sm cursor-pointer"
                animate={{ 
                  x: ["-85%", "-88%"], 
                  opacity: [0.5, 0.6],
                  scale: [0.96, 0.98]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  zIndex: 5,
                  boxShadow: "inset 8px 0 12px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
                onClick={goToPrev}
                whileHover={{ 
                  x: "-86%", 
                  opacity: 0.7,
                  scale: 0.99 
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-transparent z-10" />
                  <img
                    src={screens[prevIndex]}
                    alt="Предыдущий интерфейс"
                    className="w-full h-full object-cover object-top scale-105 -translate-x-4"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Центральная карточка (активная) */}
              <motion.div
                className="relative w-[90%] h-[95%] rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl"
                animate={controls}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  zIndex: 10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.15)",
                }}
                whileHover={{ 
                  scale: 1.005,
                  boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(16, 185, 129, 0.2)"
                }}
              >
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
              </motion.div>

              {/* Правая карточка (следующая) - виден только краешек */}
              <motion.div
                className="absolute right-0 w-[20%] h-[88%] rounded-r-2xl overflow-hidden border-r border-y border-zinc-800/40 bg-zinc-900/60 backdrop-blur-sm cursor-pointer"
                animate={{ 
                  x: ["85%", "88%"], 
                  opacity: [0.5, 0.6],
                  scale: [0.96, 0.98]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  zIndex: 5,
                  boxShadow: "inset -8px 0 12px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
                onClick={goToNext}
                whileHover={{ 
                  x: "86%", 
                  opacity: 0.7,
                  scale: 0.99 
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-l from-zinc-900/90 via-zinc-900/50 to-transparent z-10" />
                  <img
                    src={screens[nextIndex]}
                    alt="Следующий интерфейс"
                    className="w-full h-full object-cover object-top scale-105 translate-x-4"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Минималистичные стрелки - только иконки */}
              <button
                onClick={goToPrev}
                className="absolute -left-6 md:-left-8 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center group focus:outline-none"
                aria-label="Предыдущий слайд"
                disabled={isAnimating}
              >
                <div className="relative">
                  <svg 
                    className="w-6 h-6 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M15 19l-7-7 7-7" 
                    />
                  </svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute -right-6 md:-right-8 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center group focus:outline-none"
                aria-label="Следующий слайд"
                disabled={isAnimating}
              >
                <div className="relative">
                  <svg 
                    className="w-6 h-6 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </button>
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