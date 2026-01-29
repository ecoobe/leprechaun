import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Лепрекон — спокойствие в финансах",
  description:
    "Лепрекон — персональный финансовый помощник. Напоминания о платежах, контроль карт и кредитов, Telegram-уведомления.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} scroll-smooth`}
    >
      <body
        className="
          min-h-screen
          bg-zinc-950
          text-zinc-100
          font-sans
          antialiased
        "
      >
        {children}
      </body>
    </html>
  );
}