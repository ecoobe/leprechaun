import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coobe",
  description: "Coobe - база ИИ агентов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-black text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}