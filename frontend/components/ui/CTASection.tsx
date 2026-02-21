"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <>
      {/* ================= CTA ================= */}
      <section className="relative z-10 px-6 py-40">
        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              relative
              rounded-3xl
              border border-zinc-800
              bg-zinc-900/70
              backdrop-blur
              overflow-hidden
            "
          >
            {/* subtle inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5" />

            <div className="relative grid gap-16 p-14 lg:grid-cols-2 lg:items-center">

              {/* Left side — text */}
              <div>
                <p className="text-sm tracking-widest uppercase text-zinc-500">
                  Начните прямо сейчас
                </p>

                <h3 className="mt-6 text-5xl font-semibold tracking-tight leading-tight">
                  Возьмите финансы <br className="hidden sm:block" />
                  под контроль
                </h3>

                <p className="mt-6 text-xl text-zinc-400 leading-relaxed max-w-xl">
                  Присоединяйтесь к пользователям, которые уже систематизировали 
                  свои платежи и перестали переживать о сроках.
                  Всё просто. Без сложностей. Без скрытых условий.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-5">

                  {/* Primary */}
                  <button
                    className="
                      rounded-full
                      bg-emerald-500
                      px-8 py-4
                      text-lg font-medium
                      text-black
                      transition-all duration-300
                      hover:bg-emerald-400
                      hover:translate-y-[-2px]
                    "
                  >
                    Попробовать бесплатно
                  </button>

                  {/* Secondary */}
                  <button
                    className="
                      rounded-full
                      border border-zinc-700
                      px-8 py-4
                      text-lg font-medium
                      text-zinc-300
                      transition-all duration-300
                      hover:border-zinc-500
                      hover:bg-zinc-800/60
                    "
                  >
                    Узнать больше
                  </button>

                </div>

                <p className="mt-8 text-sm text-zinc-600">
                  Кредитная карта не требуется • Без скрытых платежей
                </p>
              </div>

              {/* Right side — visual accent block */}
              <div className="relative hidden lg:block">

                <div className="
                  absolute inset-0 rounded-3xl 
                  bg-gradient-to-br from-emerald-500/10 to-indigo-500/10
                  blur-3xl
                " />

                <div className="
                  relative
                  rounded-3xl
                  border border-zinc-800
                  bg-zinc-950/80
                  p-10
                ">
                  <div className="space-y-4">
                    <div className="h-4 w-2/3 rounded bg-zinc-800" />
                    <div className="h-4 w-1/2 rounded bg-zinc-800/70" />
                    <div className="h-4 w-3/4 rounded bg-zinc-800/60" />
                  </div>

                  <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="h-3 w-1/2 rounded bg-emerald-400/40 mb-2" />
                    <div className="h-3 w-2/3 rounded bg-emerald-400/30" />
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-zinc-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div>
              <div className="text-zinc-300 text-lg font-medium">
                Leprechaun
              </div>
              <div className="mt-3 text-sm text-zinc-600 max-w-md">
                Финансовый помощник, который помогает держать обязательства под контролем
                и принимать более осознанные решения.
              </div>
            </div>

            <div className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Leprechaun. Все права защищены.
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}