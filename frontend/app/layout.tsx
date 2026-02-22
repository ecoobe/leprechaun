import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const manrope = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="ru" className={`${manrope.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}