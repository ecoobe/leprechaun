"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="coobe"
      className="
        logo
        fixed
        top-6
        left-12
        z-50
      "
    >
      coobe
    </Link>
  );
}