"use client";

import { motion } from "framer-motion";

const lines = [
  { x1: "10%", y1: "20%", x2: "35%", y2: "35%" },
  { x1: "35%", y1: "35%", x2: "60%", y2: "20%" },
  { x1: "60%", y1: "20%", x2: "85%", y2: "40%" },

  { x1: "15%", y1: "70%", x2: "40%", y2: "55%" },
  { x1: "40%", y1: "55%", x2: "65%", y2: "75%" },
  { x1: "65%", y1: "75%", x2: "90%", y2: "60%" },

  { x1: "35%", y1: "35%", x2: "40%", y2: "55%" },
  { x1: "60%", y1: "20%", x2: "65%", y2: "75%" },
];


const nodes = [
  ["10%", "20%"],
  ["35%", "35%"],
  ["60%", "20%"],
  ["85%", "40%"],

  ["15%", "70%"],
  ["40%", "55%"],
  ["65%", "75%"],
  ["90%", "60%"],
];


export function BackgroundGradient() {
  return (
    <div className="
      pointer-events-none
      fixed
      inset-0
      overflow-hidden
      opacity-40
    ">
      
      <motion.svg
        viewBox="0 0 1000 1000"
        className="
          absolute
          h-full
          w-full
        "
        animate={{
          x: [-15, 15, -15],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgb(63 63 70)"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}


        {nodes.map(([cx, cy], index) => (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill="rgb(82 82 91)"
            animate={{
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
        ))}

      </motion.svg>

    </div>
  );
}