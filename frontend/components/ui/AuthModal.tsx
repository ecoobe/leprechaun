"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { login, register, requestCode } from "@/lib/api";
import { Button } from "@/components/ui/button";


interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}


export function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState<"email" | "confirm">("email");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const resetMessages = () => {
    setError("");
    setSuccess("");
  };


  const close = () => {
    resetMessages();
    onClose();
  };


  const switchMode = (newMode: "login" | "register") => {
    resetMessages();

    setMode(newMode);

    setCode("");
    setPassword("");
    setConfirmPassword("");

    if (newMode === "register") {
      setStep("email");
    }
  };


  const saveTokens = (data: any) => {
    localStorage.setItem(
      "access_token",
      data.access_token
    );

    localStorage.setItem(
      "refresh_token",
      data.refresh_token
    );
  };


  const handleLogin = async () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }


    try {
      setLoading(true);
      resetMessages();

      const data = await login(
        email,
        password
      );

      saveTokens(data);

      close();

      router.push("/dashboard");

    } catch (err: any) {
      setError(
        err.message || "Неверный email или пароль"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleRequestCode = async () => {
    if (!email) {
      setError("Введите email");
      return;
    }


    try {
      setLoading(true);
      resetMessages();

      const result = await requestCode(email);

      setSuccess(
        result.message || "Код отправлен на почту"
      );

      setStep("confirm");

    } catch (err: any) {
      setError(
        err.message || "Ошибка отправки кода"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleRegister = async () => {

    if (!code || !password || !confirmPassword) {
      setError("Заполните все поля");
      return;
    }


    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }


    if (password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }


    try {

      setLoading(true);
      resetMessages();


      await register(
        email,
        code,
        password
      );


      const data = await login(
        email,
        password
      );


      saveTokens(data);

      close();

      router.push("/dashboard");


    } catch(err:any){

      setError(
        err.message || "Ошибка регистрации"
      );

    } finally {
      setLoading(false);
    }
  };


  if (!open) return null;


  return (
    <AnimatePresence>

      <motion.div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/70
          backdrop-blur-sm
          px-4
        "
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        onClick={close}
      >


        <motion.div
          onClick={(e)=>e.stopPropagation()}
          initial={{
            opacity:0,
            scale:0.96,
            y:20
          }}
          animate={{
            opacity:1,
            scale:1,
            y:0
          }}
          exit={{
            opacity:0,
            scale:0.96
          }}
          transition={{
            duration:0.2
          }}

          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950
            p-8
            shadow-2xl
          "
        >


          <div className="
            flex
            items-center
            justify-between
            mb-8
          ">

            <h2 className="
              text-xl
              font-semibold
            ">
              {
                mode === "login"
                ? "Войти"
                : "Создать аккаунт"
              }
            </h2>


            <button
              onClick={close}
              className="
                text-zinc-500
                hover:text-white
                transition
              "
            >
              <X size={20}/>
            </button>

          </div>



          {
            error && (
              <div className="
                mb-5
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                p-3
                text-sm
                text-red-300
              ">
                {error}
              </div>
            )
          }


          {
            success && (
              <div className="
                mb-5
                rounded-xl
                border
                border-emerald-500/30
                bg-emerald-500/10
                p-3
                text-sm
                text-emerald-300
              ">
                {success}
              </div>
            )
          }



          <div className="space-y-5">


            <div>
              <label className="form-label">
                Email
              </label>

              <input
                className="form-input"
                type="email"
                value={email}
                disabled={
                  loading ||
                  (
                    mode==="register" &&
                    step==="confirm"
                  )
                }
                onChange={
                  e=>setEmail(e.target.value)
                }
                placeholder="you@example.com"
              />
            </div>



            {
              mode==="login" && (

                <div>
                  <label className="form-label">
                    Пароль
                  </label>

                  <input
                    className="form-input"
                    type="password"
                    value={password}
                    disabled={loading}
                    onChange={
                      e=>setPassword(e.target.value)
                    }
                    placeholder="Введите пароль"
                  />

                </div>

              )
            }



            {
              mode==="register" &&
              step==="confirm" && (

              <>

                <div>
                  <label className="form-label">
                    Код из письма
                  </label>

                  <input
                    className="form-input"
                    value={code}
                    disabled={loading}
                    onChange={
                      e=>setCode(e.target.value)
                    }
                    placeholder="000000"
                  />

                </div>


                <div>
                  <label className="form-label">
                    Пароль
                  </label>

                  <input
                    className="form-input"
                    type="password"
                    value={password}
                    disabled={loading}
                    onChange={
                      e=>setPassword(e.target.value)
                    }
                  />

                </div>


                <div>
                  <label className="form-label">
                    Повторите пароль
                  </label>

                  <input
                    className="form-input"
                    type="password"
                    value={confirmPassword}
                    disabled={loading}
                    onChange={
                      e=>setConfirmPassword(e.target.value)
                    }
                  />

                </div>

              </>
            )}



            <Button
              className="
                w-full
                rounded-full
              "
              disabled={loading}
              onClick={
                mode==="login"
                  ? handleLogin
                  :
                step==="email"
                  ? handleRequestCode
                  : handleRegister
              }
            >

              {
                loading
                ?
                "Загрузка..."
                :
                mode==="login"
                ?
                "Войти"
                :
                step==="email"
                ?
                "Получить код"
                :
                "Создать аккаунт"
              }

            </Button>


          </div>




          <div className="
            mt-8
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
                  onClick={()=>switchMode("register")}
                  className="
                    text-emerald-400
                    hover:text-emerald-300
                  "
                >
                  Зарегистрироваться
                </button>
              </>
              :
              <>
                Уже есть аккаунт?{" "}
                <button
                  onClick={()=>switchMode("login")}
                  className="
                    text-emerald-400
                    hover:text-emerald-300
                  "
                >
                  Войти
                </button>
              </>
            }


          </div>


        </motion.div>


      </motion.div>

    </AnimatePresence>
  );
}