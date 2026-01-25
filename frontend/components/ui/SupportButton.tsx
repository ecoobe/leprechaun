"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function SupportButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 hover:border-emerald-400 transition"
      >
        💬
        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1 text-xs text-zinc-200 opacity-0 group-hover:opacity-100 transition">
          Написать разработчику
        </span>
      </Link>
    </motion.div>
  );
}