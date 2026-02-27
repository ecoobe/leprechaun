"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  CreditCard,
  Bot,
  Bell,
  BarChart3,
  Settings,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/ui/Sidebar";
import { UserMenu } from "@/components/ui/UserMenu";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

// Компонент карточки инструмента (без изменений)
const ToolCard = ({
  icon: Icon,
  title,
  description,
  status = "inactive",
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  status?: "active" | "soon" | "inactive";
  onClick?: () => void;
}) => {
  const isActive = status === "active";
  const isSoon = status === "soon";

  return (
    <motion.div
      whileHover={!isSoon ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        relative rounded-2xl border p-6 backdrop-blur-sm transition-all
        ${
          isActive
            ? "border-emerald-500/40 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
            : isSoon
            ? "border-zinc-700/30 bg-zinc-800/20 opacity-75 cursor-not-allowed"
            : "border-border bg-card hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5"
        }
      `}
      onClick={!isSoon ? onClick : undefined}
    >
      {isActive && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Активно</span>
          </div>
        </div>
      )}
      {isSoon && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800/40 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Скоро</span>
          </div>
        </div>
      )}

      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center mb-4
          ${
            isActive
              ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
              : "bg-zinc-800/40"
          }
        `}
      >
        <Icon
          className={`w-7 h-7 ${
            isActive ? "text-emerald-400" : "text-muted-foreground"
          }`}
        />
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      // TODO: запросить /auth/me для получения email
      setEmail("user@example.com");
    } catch (e) {
      console.error("Invalid token", e);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </main>
    );
  }

  const tools = [
    {
      icon: CreditCard,
      title: "Мои карты",
      description:
        "Управляйте кредитными картами, отслеживайте лимиты и платежи",
      status: "active" as const,
    },
    {
      icon: Bot,
      title: "Telegram-бот",
      description:
        "Настройте уведомления и получайте напоминания в Telegram",
      status: "active" as const,
    },
    {
      icon: Bell,
      title: "Уведомления",
      description: "Настройте типы уведомлений и время их получения",
      status: "soon" as const,
    },
    {
      icon: BarChart3,
      title: "Статистика",
      description: "Анализируйте свои расходы и историю платежей",
      status: "soon" as const,
    },
    {
      icon: Settings,
      title: "Настройки профиля",
      description: "Измените личные данные и параметры безопасности",
      status: "inactive" as const,
    },
  ];

  return (
    <>
      {/* Фоновые элементы */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Sidebar />

      <main className="relative min-h-screen pl-64">
        <div className="p-8">
          {/* Верхняя панель: приветствие + меню пользователя */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Личный кабинет</h1>
              <p className="text-muted-foreground">
                Добро пожаловать,{" "}
                <span className="text-emerald-400">{email}</span>
              </p>
            </div>
            <UserMenu email={email || ""} />
          </div>

          {/* Сетка карточек */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ToolCard
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  status={tool.status}
                  onClick={() => {
                    if (tool.status === "active") {
                      alert(`Переход в раздел "${tool.title}" (будет реализовано)`);
                    }
                  }}
                />
              </motion.div>
            ))}
          </section>

          {/* Нижняя плашка */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center text-sm text-muted-foreground/60"
          >
            <Sparkles className="inline w-4 h-4 mr-1 text-emerald-400" />
            Больше инструментов появится в ближайшее время
          </motion.div>
        </div>
      </main>
    </>
  );
}