"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Проверка авторизации при монтировании и при изменениях в localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setMenuOpen(false);
    router.push("/");
  };

  const goToSettings = () => {
    setMenuOpen(false);
    router.push("/dashboard/settings");
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="nav-container flex items-center justify-between">
        {/* Логотип слева — ведёт на главную или дашборд */}
        <Link
          href={isAuthenticated ? "/dashboard" : "/#hero"}
          className="group shrink-0"
        >
          <span className="logo-text">leprechaun</span>
        </Link>

        {/* Центральный блок — навигация для гостей (занимает место, но скрывается) */}
        <div className="flex-1 flex justify-center">
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-10 text-base font-medium">
              <Link href="/#how-it-works" className="nav-link">
                Как работает
              </Link>
              <Link href="/#testimonials" className="nav-link">
                Отзывы
              </Link>
              <Link href="/#faq" className="nav-link">
                FAQ
              </Link>
              <Link href="/#cta" className="nav-link">
                Начать
              </Link>
            </div>
          )}
        </div>

        {/* Правый блок — кнопка "Войти" или аватар */}
        <div className="shrink-0">
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition"
                aria-label="Меню пользователя"
              >
                <UserCircle className="w-6 h-6 text-emerald-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-xl overflow-hidden">
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
          ) : (
            <Button asChild variant="primary">
              <Link href="/login">Войти</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}