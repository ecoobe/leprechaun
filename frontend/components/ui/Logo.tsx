"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="
        absolute
        left-6
        top-6
        z-20
        text-xl
        font-semibold
        tracking-tight
        text-white
        transition-colors
        duration-150
        hover:text-zinc-300
      "
    >
      coobe
    </Link>
  );
}