"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="coobe"
      className="
  absolute
  top-6
  left-10
  z-20
  select-none
  text-[34px]
  font-medium
  tracking-[-0.05em]
  text-zinc-100
  transition-colors
  duration-200
  hover:text-white
"
    >
      coobe
    </Link>
  );
}