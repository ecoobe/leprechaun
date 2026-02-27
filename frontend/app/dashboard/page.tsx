"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { motion } from "framer-motion";
import { 
  CreditCard, Bot, Bell, BarChart3, Settings, CheckCircle2, Clock 
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

interface Tool {
  icon: React.ElementType;
  title: string;
  description: string;
  status: "active" | "soon" | "inactive";
}

const ToolCard = ({ icon: Icon, title, description, status, onClick }: {
  icon: React.ElementType;
  title: string;
  description: string;
  status: "active" | "soon" | "inactive";
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
          ? "border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10" 
          : isSoon
          ? "border-zinc-700/50 bg-zinc-800/30 opacity-75 cursor-not-allowed"
          : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/60"
        }
      `}
      onClick={!isSoon ? onClick : undefined}
    >
      {/* Статус */}
      {(isActive || isSoon) && (
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isActive 
              ? "text-emerald-400 bg-emerald-500/10" 
              : "text-zinc-400 bg-zinc-800/50"
          }`}>
            {isActive ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            <span>{isActive ? "Активно" : "Скоро"}</span>
          </div>
        </div>
      )}

      {/* Иконка */}
      <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center mb-4
        ${isActive ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" : "bg-zinc-800/50"}
      `}>
        <Icon className={`w-7 h-7 ${isActive ? "text-emerald-400" : "text-zinc-400"}`} />
      </div>

      <h3 className={`text-xl font-semibold mb-2 ${isActive ? "text-white" : "text-zinc-300"}`}>
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
    // TODO: позже можно сделать запрос /auth/me для реального email
    setEmail("user@example.com"); // заглушка
  } catch (e) {
    console.error("Invalid token", e);
    router.push("/login");
  } finally {
    setLoading(false);
  }
}, [router]);

  const tools: Tool[] = [
    { icon: CreditCard, title: "Мои карты", description: "Управляйте кредитными картами, отслеживайте лимиты и платежи", status: "active" },
    { icon: Bot, title: "Telegram-бот", description: "Настройте уведомления и получайте напоминания в Telegram", status: "active" },
    { icon: Bell, title: "Уведомления", description: "Настройте типы уведомлений и время их получения", status: "soon" },
    { icon: BarChart3, title: "Статистика", description: "Анализируйте свои расходы и историю платежей", status: "soon" },
    { icon: Settings, title: "Настройки профиля", description: "Измените личные данные и параметры безопасности", status: "inactive" },
  ];

  return (
    <>
      {/* Фоновые градиенты */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Шапка */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">Личный кабинет</h1>
            <p className="text-zinc-400 text-lg">
              Добро пожаловать, <span className="text-emerald-400">{email}</span>
            </p>
          </motion.div>

          {/* Сетка инструментов */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <ToolCard
                key={tool.title}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                status={tool.status}
                onClick={() => tool.status === "active" && alert(`Переход в раздел "${tool.title}"`)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}