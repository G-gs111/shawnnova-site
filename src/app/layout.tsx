import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "./fde-portfolio.css";
import "./fde-refinement.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://260604.xyz"),
  title: {
    default: "葛少玉 Shawnnova | FDE · AI 应用与业务系统落地",
    template: "%s | Shawnnova",
  },
  description:
    "葛少玉（Shawnnova）的 FDE 作品集：把一线业务问题连接到数据、AI、API 与可运行系统。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
