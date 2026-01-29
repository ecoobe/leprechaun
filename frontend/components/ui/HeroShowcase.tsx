"use client";

import Image from "next/image";

export function HeroShowcase() {
  return (
    <section className="relative w-full flex items-center justify-center">
      {/* SCALE CONTAINER */}
      <div className="relative scale-150">
        
        {/* HAND (UNDER HAT) */}
        <Image
          src="/hand.png"
          alt="Leprechaun hand"
          width={220}
          height={140}
          priority
          className="
            absolute
            bottom-[-10px]
            left-[62%]
            -translate-x-1/2
            z-0
          "
        />

        {/* HAT (TOP) */}
        <Image
          src="/hat.png"
          alt="Leprechaun hat"
          width={320}
          height={220}
          priority
          className="relative z-10"
        />

      </div>
    </section>
  );
}