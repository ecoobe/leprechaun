"use client";

import Image from "next/image";

export function HeroShowcase() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative">
        <Image
          src="/hat.png"
          alt="Hat"
          width={300}
          height={200}
          priority
        />

        <Image
          src="/hand.png"
          alt="Hand"
          width={200}
          height={120}
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2"
          priority
        />
      </div>
    </section>
  );
}