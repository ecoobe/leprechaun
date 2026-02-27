"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/ui/Sidebar";
import { UserMenu } from "@/components/ui/UserMenu";
import { Button } from "@/components/ui/button";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

export default function SettingsPage() {
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
          {/* Верхняя панель: заголовок + меню пользователя */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Настройки профиля</h1>
            <UserMenu email={email || ""} />
          </div>

          {/* Форма настроек */}
          <div className="max-w-2xl">
            <div className="form-card !max-w-full p-8">
              <div className="space-y-6">
                <div>
                  <label className="form-label">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="form-input"
                    defaultValue=""
                  />
                </div>
                <div>
                  <label className="form-label">Фамилия</label>
                  <input
                    type="text"
                    placeholder="Ваша фамилия"
                    className="form-input"
                    defaultValue=""
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="form-input"
                    defaultValue={email || ""}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email нельзя изменить
                  </p>
                </div>
                <div>
                  <label className="form-label">Новый пароль</label>
                  <input
                    type="password"
                    placeholder="Оставьте пустым, если не хотите менять"
                    className="form-input"
                  />
                </div>
                <div className="pt-4">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}