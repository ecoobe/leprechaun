"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">

      <Link
        href="https://t.me/dmilarin"
        target="_blank"
        aria-label="Написать разработчику"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-default
          bg-black
          text-zinc-500
          transition
          hover:border-hover
          hover:text-white
        "
      >

        <MessageCircle
          className="h-5 w-5"
          strokeWidth={1.8}
        />

      </Link>


      <div
        className="
          pointer-events-none
          absolute
          right-14
          top-1/2
          -translate-y-1/2
          whitespace-nowrap

          border
          border-default
          bg-black
          px-3
          py-2

          text-sm
          text-zinc-300

          opacity-0
          translate-x-2

          transition-all
          duration-150

          group-hover:opacity-100
          group-hover:translate-x-0
        "
      >
        Написать разработчику
      </div>

    </div>
  );
}