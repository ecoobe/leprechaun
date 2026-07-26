"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="
        absolute
        top-6
        left-10
        z-20
        select-none
        text-3xl
        font-semibold
        tracking-tight
        transition-colors
        duration-200
      "
      aria-label="Coobe"
    >
      <span className="text-white">c</span>
      <span className="text-zinc-500">oo</span>
      <span className="text-white">be</span>
    </Link>
  );
}