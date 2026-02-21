"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <>
      {/* ================= CTA ================= */}
      <section className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative
              rounded-3xl
              border border-zinc-800
              bg-gradient-to-br
              from-zinc-900
              to-zinc-950
              p-12
              text-center
              overflow-hidden
            "
          >
            {/* subtle glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-emerald-500/5 blur-2xl" />

            <div className="relative z-10">

              {/* Small label */}
              <p className="text-sm uppercase tracking-widest text-emerald-400/70">
                Полностью бесплатно навсегда
              </p>

              {/* Main heading */}
              <h3 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
                Готовы начать?
              </h3>

              {/* Description */}
              <p className="mt-6 text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                Присоединяйтесь к тысячам пользователей, которые уже управляют 
                своими финансами с Leprecon.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">

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
                    hover:scale-[1.02]
                  "
                >
                  Попробовать бесплатно
                </button>

                {/* Secondary */}
                <button
                  className="
                    rounded-full
                    border border-zinc-700
                    bg-zinc-900
                    px-8 py-4
                    text-lg font-medium
                    text-zinc-300
                    transition-all duration-300
                    hover:border-zinc-500
                    hover:bg-zinc-800
                  "
                >
                  Узнать больше
                </button>

              </div>

              {/* Small note */}
              <p className="mt-8 text-sm text-zinc-500">
                Кредитная карта не требуется • Без скрытых платежей
              </p>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-zinc-800 px-6 py-14 text-center text-sm sm:text-base text-zinc-500">
        <div className="text-zinc-400">
          Leprechaun — ваш финансовый помощник
        </div>

        <div className="mt-4 text-xs sm:text-sm text-zinc-600">
          Сделано с заботой, чтобы помочь разобраться с финансами
        </div>
      </footer>
    </>
  );
}