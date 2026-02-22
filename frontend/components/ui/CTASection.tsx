"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <>
      <section className="relative z-10 px-6 py-40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="cta-card"
          >
            {/* subtle gradient layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5" />

            <div className="cta-card-inner">
              {/* LEFT */}
              <div>
                <p className="text-sm tracking-widest uppercase text-zinc-500">
                  Полностью бесплатно навсегда
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

                <div className="mt-10 flex flex-wrap gap-5">
                  <Button asChild variant="primary" size="lg" className="px-6 py-4">
                    <Link href="https://t.me/dmilarin" target="_blank">
                      Начать
                    </Link>
                  </Button>

                  <Button asChild variant="secondary" size="lg" className="px-6 py-4">
                    <Link href="/how-it-works">
                      Узнать больше
                    </Link>
                  </Button>
                </div>

                <p className="mt-8 footer-text">
                  Кредитная карта не требуется • Без скрытых платежей
                </p>
              </div>

              {/* RIGHT visual */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 blur-3xl" />
                <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 p-10">
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

      <footer className="relative z-10 border-t border-zinc-800 px-6 py-20">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-zinc-300 text-lg font-medium">
              Leprechaun
            </div>
            <div className="mt-3 text-sm text-zinc-600 max-w-md">
              Финансовый помощник, который помогает держать обязательства под контролем
              и принимать более осознанные решения.
            </div>
          </div>

          <div className="footer-text">
            © {new Date().getFullYear()} Leprechaun. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  );
}