"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const initial = (email || "?").charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      try {
        await logout(refreshToken);
      } catch {
        // ignore
      }
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    router.replace("/");
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="avatar"
        aria-label="Меню пользователя"
      >
        {initial}
      </button>

      {open && (
        <div className="dropdown">
          <div className="dropdown-header">
            {email}
          </div>

          <button
            className="dropdown-item"
            onClick={() => {
              setOpen(false);
              router.push("/dashboard/settings");
            }}
          >
            Настройки
          </button>

          <button
            className="dropdown-item"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}