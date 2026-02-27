"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { logout } from "@/lib/api";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = email ? email[0].toUpperCase() : "?";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      try {
        await logout(refreshToken);
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/");
  };

  const goToSettings = () => {
    setMenuOpen(false);
    router.push("/dashboard/settings");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-zinc-900 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 border border-white/20"
        aria-label="Меню пользователя"
      >
        {initial}
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-2 text-sm text-muted-foreground border-b border-zinc-800">
            {email}
          </div>
          <button
            onClick={goToSettings}
            className="w-full px-4 py-3 text-left text-sm text-zinc-200 hover:bg-zinc-800/70 flex items-center gap-2 transition"
          >
            <Settings className="w-4 h-4" />
            Настройки
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-zinc-800/70 flex items-center gap-2 transition border-t border-zinc-800"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}