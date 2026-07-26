"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        className="
          group
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-zinc-800
          bg-black
          text-zinc-500
          transition-colors
          duration-150
          hover:border-zinc-600
          hover:text-white
        "
      >
        <MessageCircle className="h-4.5 w-4.5" />

        <span
          className="
            pointer-events-none
            absolute
            right-14
            whitespace-nowrap
            rounded-md
            border
            border-zinc-800
            bg-black
            px-3
            py-2
            text-sm
            text-zinc-300
            opacity-0
            transition-all
            duration-150
            group-hover:opacity-100
          "
        >
          Написать разработчику мне
        </span>
      </Link>
    </motion.div>
  );
}