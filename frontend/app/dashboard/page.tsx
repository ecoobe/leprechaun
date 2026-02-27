"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

// Компонент пункта меню (кнопка в левой части)
const MenuItem = ({
  icon: Icon,
  title,
  status = "inactive",
  isSelected,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  status?: "active" | "soon" | "inactive";
  isSelected: boolean;
  onClick?: () => void;
}) => {
  const isActive = status === "active";
  const isSoon = status === "soon";
  const canClick = isActive && !isSoon;

  return (
    <motion.div
      whileHover={canClick ? { x: 4 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        relative rounded-full border px-5 py-3 backdrop-blur-sm transition-all cursor-pointer
        ${
          isSelected
            ? "border-emerald-500/60 bg-emerald-500/10 shadow-md shadow-emerald-500/10"
            : canClick
            ? "border-border bg-card hover:border-emerald-500/30 hover:bg-card/80"
            : "border-zinc-700/30 bg-zinc-800/20 opacity-60 cursor-not-allowed"
        }
      `}
      onClick={canClick ? onClick : undefined}
      role="button"
      tabIndex={canClick ? 0 : -1}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center shrink-0
            ${
              isSelected || isActive
                ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                : "bg-zinc-800/40"
            }
          `}
        >
          <Icon
            className={`w-5 h-5 ${
              isSelected || isActive ? "text-emerald-400" : "text-muted-foreground"
            }`}
          />
        </div>
        <span
          className={`font-medium truncate ${
            isSelected || isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </span>
        {isSoon && (
          <span className="ml-auto text-xs bg-zinc-800/40 px-3 py-1 rounded-full text-muted-foreground whitespace-nowrap">
            Скоро
          </span>
        )}
      </div>
    </motion.div>
  );
};

// Компонент контента для правой панели
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
      key={tool.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
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

      <main className="relative min-h-screen">
        <div className="p-8">
          {/* Верхняя панель: логотип слева, меню пользователя справа */}
          <div className="flex justify-between items-center mb-6">
            <Link href="/dashboard" className="group">
              <span className="logo-text text-2xl">leprechaun</span>
            </Link>
            <UserMenu email={email || ""} />
          </div>

          {/* Единая капсула, содержащая левое меню и правый контент */}
          <div className="form-card !max-w-full p-0 overflow-hidden flex">
            {/* Левая колонка (меню) */}
            <div className="w-80 border-r border-border p-6 bg-card/50">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-sm font-medium text-muted-foreground">Инструменты</h2>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <MenuItem
                    key={tool.id}
                    icon={tool.icon}
                    title={tool.title}
                    status={tool.status}
                    isSelected={selectedToolId === tool.id}
                    onClick={() => setSelectedToolId(tool.id)}
                  />
                ))}
              </div>
            </div>

            {/* Правая колонка (контент) */}
            <div className="flex-1 p-8">
              {selectedTool ? (
                <ToolContent tool={selectedTool} />
              ) : (
                <div className="h-full flex items-center justify-center">
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
        </div>
      </main>
    </>
  );
}