"use client";

import { motion } from "framer-motion";

export function BackgroundGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <motion.div
        animate={{
          x: [-80, 80, -80],
          y: [-40, 50, -40],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-64
          -top-64
          h-[650px]
          w-[650px]
          rounded-full
          bg-zinc-800/10
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [70, -60, 70],
          y: [60, -70, 60],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-250px]
          top-[10%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-zinc-700/10
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [-40, 50, -40],
          y: [60, -50, 60],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-280px]
          left-[20%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-zinc-600/10
          blur-3xl
        "
      />

    </div>
  );
}