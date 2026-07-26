"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { UserMenu } from "@/components/ui/UserMenu";

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
      router.push("/");
      return;
    }


    try {

      const decoded = jwtDecode<TokenPayload>(token);

      // Пока нет /auth/me
      // временная заглушка
      setEmail("user@example.com");


    } catch(error){

      console.error("Invalid token", error);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      router.push("/");

    }
    finally {

      setLoading(false);

    }

  }, [router]);



  if(loading){

    return (
      <main className="
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      text-zinc-500
      ">
        Загрузка...
      </main>
    );

  }



  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      "
    >


      {/* Верхняя панель */}

      <header className="
        relative
        h-20
        flex
        items-center
        justify-center
        border-b
        border-zinc-900
      ">


        <h1 className="
          text-lg
          font-medium
          tracking-tight
        ">
          Личный кабинет пользователя
        </h1>


        <div className="
          absolute
          right-6
        ">

          <UserMenu email={email}/>

        </div>


      </header>



      {/* Контент */}

      <section className="
        flex
        items-center
        justify-center
        min-h-[calc(100vh-5rem)]
      ">


        <div className="
          text-center
        ">

          <h2 className="
            text-xl
            font-medium
          ">
            Добро пожаловать
          </h2>


          <p className="
            mt-2
            text-sm
            text-zinc-500
          ">
            Здесь скоро появится ваш личный кабинет
          </p>


        </div>


      </section>


    </main>

  );

}