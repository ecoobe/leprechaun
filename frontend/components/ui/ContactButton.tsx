"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        aria-label="Написать разработчику"
        className="icon-button group"
      >
        <MessageCircle className="h-4 w-4" />

        <span className="tooltip">
          Написать разработчику
        </span>
      </Link>
    </motion.div>
  );
}