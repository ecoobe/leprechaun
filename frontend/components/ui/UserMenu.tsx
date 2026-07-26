"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      try {
        await logout(refreshToken);
      } catch {}
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    router.replace("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm font-medium text-white transition hover:border-zinc-500"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-800 bg-black shadow-xl">
          <div className="border-b border-zinc-800 px-4 py-3 text-xs text-zinc-500">
            {email}
          </div>

          <button
            onClick={() => {
              setOpen(false);
              router.push("/dashboard/settings");
            }}
            className="block w-full px-4 py-3 text-left text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Настройки
          </button>

          <button
            onClick={handleLogout}
            className="block w-full px-4 py-3 text-left text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}