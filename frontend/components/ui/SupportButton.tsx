"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function SupportButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="support-button"
    >
      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        className="group relative flex h-full w-full items-center justify-center"
      >
        💬
        <span className="support-tooltip">
          Написать разработчику
        </span>
      </Link>
    </motion.div>
  );
}