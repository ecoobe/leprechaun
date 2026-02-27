"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Bot, Bell, BarChart3, Settings } from "lucide-react";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  status?: "active" | "soon" | "inactive";
}

const sidebarItems: SidebarItem[] = [
  { icon: CreditCard, label: "Мои карты", href: "/dashboard/cards", status: "active" },
  { icon: Bot, label: "Telegram-бот", href: "/dashboard/bot", status: "active" },
  { icon: Bell, label: "Уведомления", href: "/dashboard/notifications", status: "soon" },
  { icon: BarChart3, label: "Статистика", href: "/dashboard/stats", status: "soon" },
  { icon: Settings, label: "Настройки", href: "/dashboard/settings", status: "inactive" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card/80 backdrop-blur-xl border-r border-border p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard" className="block">
          <span className="logo-text text-2xl">leprechaun</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const isSoon = item.status === "soon";
          const isDisabled = item.status === "inactive" || isSoon;

          return (
            <div key={item.href}>
              {isDisabled ? (
                <div
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                    ${isSoon ? "text-muted-foreground/50 cursor-not-allowed" : "text-muted-foreground"}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isSoon && (
                    <span className="ml-auto text-xs bg-zinc-800/40 px-2 py-1 rounded-full">
                      Скоро
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors
                    ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-muted-foreground hover:bg-zinc-800/40 hover:text-foreground"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}