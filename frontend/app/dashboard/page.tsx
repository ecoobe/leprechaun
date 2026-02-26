"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode"; // установите пакет: npm install jwt-decode

interface TokenPayload {
  uid: string; // user ID
  exp: number;
  iat: number;
}

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
      // Здесь можно запросить данные пользователя с бэка, но пока просто покажем email
      // email в токене не хранится, только uid. Можем позже сделать запрос /auth/me.
      // Пока покажем заглушку.
      setEmail("Пользователь"); // временно
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

  return (
    <>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />

      <main className="relative min-h-screen flex items-start justify-center px-6 pt-40 pb-24 text-zinc-100">
        <div className="form-card max-w-md w-full">
          <div className="form-header">
            <h1 className="form-title">Личный кабинет</h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <p className="text-sm text-zinc-400">Email</p>
              <p className="text-lg font-medium">{email}</p>
            </div>

            <Button
              onClick={handleLogout}
              variant="primary"
              className="w-full rounded-full py-3"
            >
              Выйти
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}