"use client";

import { motion } from "framer-motion";

const lines = [
  ["0%", "30%", "25%", "10%"],
  ["25%", "10%", "45%", "25%"],
  ["45%", "25%", "70%", "15%"],
  ["70%", "15%", "95%", "35%"],

  ["10%", "70%", "30%", "50%"],
  ["30%", "50%", "55%", "65%"],
  ["55%", "65%", "80%", "45%"],
  ["80%", "45%", "100%", "70%"],

  ["25%", "10%", "30%", "50%"],
  ["45%", "25%", "55%", "65%"],
  ["70%", "15%", "80%", "45%"],

  ["5%", "45%", "25%", "30%"],
  ["25%", "30%", "50%", "40%"],
  ["50%", "40%", "75%", "30%"],
  ["75%", "30%", "95%", "50%"],
];

const nodes = [
  ["25%", "10%"],
  ["45%", "25%"],
  ["70%", "15%"],
  ["30%", "50%"],
  ["55%", "65%"],
  ["80%", "45%"],
  ["50%", "40%"],
];


export function BackgroundGradient() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >

      <motion.svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        animate={{
          x: [-40, 40, -40],
          y: [-20, 30, -20],
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -inset-[20%]
          h-[140%]
          w-[140%]
        "
      >

        <g
          stroke="rgba(82,82,91,0.25)"
          strokeWidth="1"
          fill="none"
        >

          {lines.map((line, index) => (
            <line
              key={index}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
            />
          ))}

        </g>


        <g
          fill="rgba(113,113,122,0.35)"
        >
          {nodes.map((node,index)=>(
            <circle
              key={index}
              cx={node[0]}
              cy={node[1]}
              r="2"
            />
          ))}
        </g>


      </motion.svg>


      {/* лёгкий дополнительный слой движения */}
      <motion.div
        animate={{
          rotate: [0, 3, 0],
          x: [-20, 20, -20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -inset-[30%]
          opacity-30
        "
      >
        <div
          className="
            h-full
            w-full
            bg-[radial-gradient(circle_at_center,rgba(82,82,91,0.12),transparent_55%)]
          "
        />
      </motion.div>

    </div>
  );
}