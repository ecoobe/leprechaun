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
} from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/ui/Sidebar";
import { UserMenu } from "@/components/ui/UserMenu";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

// Тип инструмента
interface Tool {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status: "active" | "soon" | "inactive";
}

// Компонент контента для правой панели (капсула)
const ToolContent = ({ tool }: { tool: Tool }) => {
  const getContent = () => {
    switch (tool.id) {
      case "cards":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Мои карты</h2>
            <p className="text-muted-foreground">
              Здесь будет отображаться список ваших карт, лимиты и операции.
            </p>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <div className="flex justify-between">
                  <span>💳 Visa Platinum</span>
                  <span className="text-emerald-400">Активна</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">**** 1234</div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <div className="flex justify-between">
                  <span>💳 Mastercard Gold</span>
                  <span className="text-emerald-400">Активна</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">**** 5678</div>
              </div>
            </div>
          </div>
        );
      case "bot":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Telegram-бот</h2>
            <p className="text-muted-foreground">
              Настройте уведомления и получайте напоминания в Telegram.
            </p>
            <div className="p-4 rounded-xl border border-border bg-card/50">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="font-medium">Бот активен</div>
                  <div className="text-sm text-muted-foreground">@leprechaun_bot</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Уведомления</h2>
            <p className="text-muted-foreground">
              Скоро здесь появится возможность настройки уведомлений.
            </p>
          </div>
        );
      case "stats":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Статистика</h2>
            <p className="text-muted-foreground">
              Графики и аналитика по вашим операциям появятся в ближайшее время.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Настройки профиля</h2>
            <p className="text-muted-foreground">
              Для изменения настроек перейдите в соответствующий раздел.
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Добро пожаловать!</h2>
            <p className="text-muted-foreground">
              Выберите инструмент слева, чтобы увидеть подробности.
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="form-card !max-w-full h-full p-8"
    >
      {getContent()}
    </motion.div>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

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

  const tools: Tool[] = [
    {
      id: "cards",
      icon: CreditCard,
      title: "Мои карты",
      description: "Управляйте кредитными картами, отслеживайте лимиты и платежи",
      status: "active",
    },
    {
      id: "bot",
      icon: Bot,
      title: "Telegram-бот",
      description: "Настройте уведомления и получайте напоминания в Telegram",
      status: "active",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Уведомления",
      description: "Настройте типы уведомлений и время их получения",
      status: "soon",
    },
    {
      id: "stats",
      icon: BarChart3,
      title: "Статистика",
      description: "Анализируйте свои расходы и историю платежей",
      status: "soon",
    },
    {
      id: "settings",
      icon: Settings,
      title: "Настройки профиля",
      description: "Измените личные данные и параметры безопасности",
      status: "inactive",
    },
  ];

  const selectedTool = tools.find((t) => t.id === selectedToolId) || null;

  return (
    <>
      {/* Фоновые элементы */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Sidebar
        tools={tools}
        selectedToolId={selectedToolId}
        onSelectTool={setSelectedToolId}
      />

      <main className="relative min-h-screen pl-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              {selectedTool ? selectedTool.title : "Личный кабинет"}
            </h1>
            <UserMenu email={email || ""} />
          </div>

          <div className="mt-4">
            {selectedTool ? (
              <ToolContent tool={selectedTool} />
            ) : (
              <div className="form-card !max-w-full p-8 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-emerald-400/50 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Добро пожаловать!</h3>
                  <p className="text-muted-foreground">
                    Выберите инструмент слева, чтобы начать работу.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}