"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: "5%", y: "18%" },
  { x: "18%", y: "10%" },
  { x: "32%", y: "22%" },
  { x: "48%", y: "12%" },
  { x: "65%", y: "20%" },
  { x: "82%", y: "14%" },

  { x: "10%", y: "42%" },
  { x: "26%", y: "52%" },
  { x: "44%", y: "40%" },
  { x: "62%", y: "55%" },
  { x: "78%", y: "42%" },
  { x: "92%", y: "50%" },

  { x: "6%", y: "75%" },
  { x: "22%", y: "85%" },
  { x: "38%", y: "70%" },
  { x: "55%", y: "82%" },
  { x: "72%", y: "72%" },
  { x: "88%", y: "86%" },
];


const connections = [
  [0,1],
  [1,2],
  [2,3],
  [3,4],
  [4,5],

  [0,6],
  [1,7],
  [2,8],
  [3,9],
  [4,10],
  [5,11],

  [6,7],
  [7,8],
  [8,9],
  [9,10],
  [10,11],

  [6,12],
  [7,13],
  [8,14],
  [9,15],
  [10,16],
  [11,17],

  [12,13],
  [13,14],
  [14,15],
  [15,16],
  [16,17],
];


export function BackgroundGradient() {
  return (
    <div className="
      pointer-events-none
      absolute
      inset-0
      overflow-hidden
    ">

      <motion.svg
        viewBox="0 0 1000 1000"
        className="
          absolute
          -left-[15%]
          -top-[15%]
          h-[130%]
          w-[130%]
        "
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        <g
          stroke="#27272a"
          strokeWidth="1"
          opacity="0.45"
        >

          {connections.map(([a,b], index)=>(
            <motion.line
              key={index}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}

              initial={{
                opacity:0.2
              }}

              animate={{
                opacity:[
                  0.25,
                  0.55,
                  0.25
                ]
              }}

              transition={{
                duration:
                  6 + index % 5,
                repeat:Infinity,
                ease:"easeInOut",
                delay:index * 0.15
              }}
            />
          ))}

        </g>


        <g fill="#3f3f46">

          {nodes.map((node,index)=>(
            <motion.circle

              key={index}

              cx={node.x}
              cy={node.y}
              r="2"

              animate={{
                opacity:[
                  0.2,
                  0.7,
                  0.2
                ]
              }}

              transition={{
                duration:4,
                repeat:Infinity,
                delay:index*0.2,
                ease:"easeInOut"
              }}

            />
          ))}

        </g>

      </motion.svg>


    </div>
  );
}