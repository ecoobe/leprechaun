"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="coobe"
      className="
        absolute
        top-7
        left-10
        z-20
        select-none
        text-3xl
        font-medium
        tracking-[-0.04em]
        link
      "
    >
      coobe
    </Link>
  );
}