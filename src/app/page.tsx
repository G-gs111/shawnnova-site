import type { Metadata } from "next";

import { PortfolioHome } from "@/components/fde/portfolio-home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { "zh-CN": "/", en: "/en" },
  },
};

export default function HomePage() {
  return <PortfolioHome locale="zh" />;
}
