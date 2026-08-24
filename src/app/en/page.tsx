import type { Metadata } from "next";

import { PortfolioHome } from "@/components/fde/portfolio-home";

export const metadata: Metadata = {
  title: "FDE · AI applications and business systems",
  description:
    "Shawnnova's FDE portfolio: connecting frontline business problems with data, AI, APIs and working systems.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
};

export default function EnglishHomePage() {
  return <PortfolioHome locale="en" />;
}
