"use client";

import Link from "next/link";
import { UserMenu } from "@/components/ui/UserMenu";

interface DashboardHeaderProps {
  email: string;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="nav-container flex items-center justify-between">
        {/* Логотип слева — ведёт на главную дашборда */}
        <Link href="/dashboard" className="group shrink-0">
          <span className="logo-text">leprechaun</span>
        </Link>

        {/* Центральный блок пустой (или можно оставить для симметрии) */}
        <div className="flex-1 flex justify-center"></div>

        {/* Правый блок — меню пользователя */}
        <div className="shrink-0">
          <UserMenu email={email} />
        </div>
      </nav>
    </header>
  );
}