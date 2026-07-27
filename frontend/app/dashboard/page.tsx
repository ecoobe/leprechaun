"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import { UserMenu } from "@/components/ui/UserMenu";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { Logo } from "@/components/ui/Logo";

interface TokenPayload {
  uid: string;
  exp: number;
  iat: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/");
      return;
    }

    try {
      jwtDecode<TokenPayload>(token);

      // Временно, пока нет /auth/me
      setEmail("user@example.com");

    } catch (error) {
      console.error("Invalid token", error);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      router.replace("/");
    } finally {
      setLoading(false);
    }

  }, [router]);


  if (loading) {
    return (
      <main className="page flex-center">
        <span className="text-muted">
          Загрузка...
        </span>
      </main>
    );
  }


  return (
    <main className="page">

      <BackgroundGradient />

      <Logo />


      <header className="dashboard-header">

        <h1 className="dashboard-title">
          Личный кабинет пользователя
        </h1>


        <div className="absolute right-6">
          <UserMenu email={email} />
        </div>

      </header>



      <section className="dashboard-content">

        <div className="text-center">

          <h2 className="text-xl font-medium">
            Добро пожаловать
          </h2>

          <p className="text-muted mt-2">
            Здесь скоро появится ваш личный кабинет
          </p>

        </div>

      </section>

    </main>
  );
}