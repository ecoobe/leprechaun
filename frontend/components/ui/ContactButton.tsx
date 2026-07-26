"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        className="
          group relative
          flex h-12 w-12
          items-center justify-center
          rounded-full
          border border-zinc-800
          bg-zinc-900/80
          backdrop-blur-xl
          text-zinc-300
          shadow-lg
          transition-all
          duration-300
          hover:border-emerald-500/40
          hover:text-emerald-400
          hover:shadow-emerald-500/10
        "
      >
        <MessageCircle className="h-5 w-5" />

        <span
          className="
            pointer-events-none
            absolute
            right-14
            whitespace-nowrap
            rounded-lg
            border border-zinc-800
            bg-zinc-900/95
            px-3 py-2
            text-sm
            text-zinc-200
            opacity-0
            translate-x-2
            transition-all
            duration-200
            group-hover:opacity-100
            group-hover:translate-x-0
          "
        >
          Написать разработчику
        </span>
      </Link>
    </motion.div>
  );
}