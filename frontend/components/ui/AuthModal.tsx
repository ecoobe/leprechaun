"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, register, requestCode } from "@/lib/api";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;


  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await login(email, password);

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        data.refresh_token
      );

      window.location.href="/dashboard";

    } catch(err:any){
      setError(err.message || "Ошибка входа");
    }
    finally {
      setLoading(false);
    }
  };


  const handleRegisterCode = async () => {

    try {

      setLoading(true);
      setError("");

      await requestCode(email);

      setStep(true);

    } catch(err:any){
      setError(err.message || "Ошибка отправки кода");
    }
    finally {
      setLoading(false);
    }

  };


  const handleRegister = async () => {

    if(password !== confirm){
      setError("Пароли не совпадают");
      return;
    }


    try {

      setLoading(true);
      setError("");

      await register(
        email,
        code,
        password
      );

      await handleLogin();

    }
    catch(err:any){
      setError(err.message || "Ошибка регистрации");
    }
    finally {
      setLoading(false);
    }

  };


  return (
    <AnimatePresence>

      <div
        className="
        fixed inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        "
        onClick={onClose}
      >

        <motion.div
          initial={{
            opacity:0,
            y:10
          }}
          animate={{
            opacity:1,
            y:0
          }}
          exit={{
            opacity:0,
            y:10
          }}
          transition={{
            duration:.15
          }}
          onClick={(e)=>e.stopPropagation()}
          className="
          w-full
          max-w-sm
          border
          border-zinc-800
          bg-black
          p-6
          rounded-lg
          "
        >

          <div className="mb-6">

            <h2 className="
              text-xl
              font-medium
              text-white
            ">
              {mode==="login"
                ? "Войти"
                : "Создать аккаунт"
              }
            </h2>

            <p className="
              mt-1
              text-sm
              text-zinc-500
            ">
              {mode==="login"
                ? "Введите данные аккаунта"
                : "Регистрация нового пользователя"
              }
            </p>

          </div>


          {error && (
            <div className="
            mb-4
            border
            border-red-900
            bg-red-950/30
            p-3
            text-sm
            text-red-300
            rounded-md
            ">
              {error}
            </div>
          )}



          <div className="space-y-3">


            <input
              className="
              w-full
              h-11
              border
              border-zinc-800
              bg-black
              px-3
              text-sm
              text-white
              outline-none
              rounded-md
              placeholder:text-zinc-600
              focus:border-zinc-500
              "
              placeholder="Email"
              value={email}
              onChange={
                e=>setEmail(e.target.value)
              }
            />


            {
              mode==="register" && step &&
              <input
                className="
                w-full
                h-11
                border
                border-zinc-800
                bg-black
                px-3
                text-sm
                text-white
                outline-none
                rounded-md
                placeholder:text-zinc-600
                focus:border-zinc-500
                "
                placeholder="Код из письма"
                value={code}
                onChange={
                  e=>setCode(e.target.value)
                }
              />
            }


            {
              (mode==="login" || step) &&
              <>
              <input
                type="password"
                className="
                w-full
                h-11
                border
                border-zinc-800
                bg-black
                px-3
                text-sm
                text-white
                outline-none
                rounded-md
                placeholder:text-zinc-600
                focus:border-zinc-500
                "
                placeholder="Пароль"
                value={password}
                onChange={
                  e=>setPassword(e.target.value)
                }
              />


              {
                mode==="register" &&
                <input
                  type="password"
                  className="
                  w-full
                  h-11
                  border
                  border-zinc-800
                  bg-black
                  px-3
                  text-sm
                  text-white
                  outline-none
                  rounded-md
                  placeholder:text-zinc-600
                  focus:border-zinc-500
                  "
                  placeholder="Повторите пароль"
                  value={confirm}
                  onChange={
                    e=>setConfirm(e.target.value)
                  }
                />
              }
              </>
            }


            <button
              disabled={loading}
              onClick={
                mode==="login"
                ? handleLogin
                : step
                ? handleRegister
                : handleRegisterCode
              }
              className="
              mt-3
              w-full
              h-11
              bg-white
              text-black
              text-sm
              font-medium
              rounded-md
              hover:bg-zinc-200
              transition
              disabled:opacity-50
              "
            >
              {
                loading
                ? "Загрузка..."
                :
                mode==="login"
                ? "Войти"
                :
                step
                ? "Создать аккаунт"
                : "Получить код"
              }

            </button>


          </div>


          <div className="
          mt-6
          text-center
          text-sm
          text-zinc-500
          ">

            {
              mode==="login"
              ?
              <>
              Нет аккаунта?{" "}
              <button
                className="
                text-white
                hover:text-zinc-300
                "
                onClick={()=>{
                  setMode("register");
                  setError("");
                }}
              >
                Регистрация
              </button>
              </>
              :
              <>
              Уже есть аккаунт?{" "}
              <button
                className="
                text-white
                hover:text-zinc-300
                "
                onClick={()=>{
                  setMode("login");
                  setError("");
                }}
              >
                Войти
              </button>
              </>
            }

          </div>


        </motion.div>

      </div>

    </AnimatePresence>
  );
}