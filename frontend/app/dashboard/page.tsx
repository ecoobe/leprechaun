"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { 
  CreditCard, 
  Bot, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

// Компонент карточки инструмента
const ToolCard = ({ 
  icon: Icon, 
  title, 
  description, 
  status = "active", // "active", "soon", "inactive"
  onClick 
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
        relative rounded-3xl border p-6 backdrop-blur-sm transition-all cursor-pointer
        ${isActive 
          ? 'border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10' 
          : isSoon
          ? 'border-zinc-700/50 bg-zinc-800/30 opacity-75 cursor-not-allowed'
          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/60'
        }
      `}
      onClick={!isSoon ? onClick : undefined}
    >
      {/* Статусный значок */}
      {isActive && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Активно</span>
          </div>
        </div>
      )}
      {isSoon && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 text-xs font-medium text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span>Скоро</span>
          </div>
        </div>
      )}

      {/* Иконка */}
      <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center mb-4
        ${isActive 
          ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' 
          : 'bg-zinc-800/50'
        }
      `}>
        <Icon className={`w-7 h-7 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
      </div>

      <h3 className={`text-xl font-semibold mb-2 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
        {title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">
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
      // Пока используем заглушку
      setEmail("user@example.com"); // позже заменим на реальный
    } catch (e) {
      console.error("Invalid token", e);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-zinc-400">Загрузка...</div>
        </main>
      </>
    );
  }

  // Данные для карточек инструментов
  const tools = [
    {
      icon: CreditCard,
      title: "Мои карты",
      description: "Управляйте кредитными картами, отслеживайте лимиты и платежи",
      status: "active" as const,
    },
    {
      icon: Bot,
      title: "Telegram-бот",
      description: "Настройте уведомления и получайте напоминания в Telegram",
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
      {/* Фоновые элементы (как на других страницах) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Шапка профиля */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">
              Личный кабинет
            </h1>
            <p className="text-zinc-400 text-lg">
              Добро пожаловать, <span className="text-emerald-400">{email}</span>
            </p>
          </motion.div>

          {/* Сетка инструментов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      // Здесь будет навигация на соответствующий раздел
                      alert(`Переход в раздел "${tool.title}" (будет реализовано)`);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}