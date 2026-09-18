"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { LocalizedHomeContent } from "@/content/portfolio";

import { LanguageLink } from "./language-link";

type SiteNavProps = {
  content: LocalizedHomeContent;
  homeHref?: string;
  languageHref?: string;
  anchorPrefix?: string;
};

export function SiteNav({
  content,
  homeHref = content.locale === "zh" ? "/" : "/en",
  languageHref = content.locale === "zh" ? "/en" : "/",
  anchorPrefix = "",
}: SiteNavProps) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fde-nav-shell${compact ? " is-compact" : ""}`}>
      <nav className="fde-nav" aria-label={content.locale === "zh" ? "主导航" : "Primary navigation"}>
        <Link className="fde-wordmark" href={homeHref}>
          <span>SHAWNNOVA</span>
          <small>FDE / AI DELIVERY</small>
        </Link>
        <div className="fde-nav-links">
          <a href={`${anchorPrefix}#work`}>{content.nav.work}</a>
          <a href={`${anchorPrefix}#method`}>{content.nav.method}</a>
          <a href={`${anchorPrefix}#contact`}>{content.nav.contact}</a>
        </div>
        <div className="fde-nav-actions">
          <LanguageLink
            href={languageHref}
            label={content.nav.language}
            currentLang={content.lang}
            targetLang={content.locale === "zh" ? "en" : "zh-CN"}
          />
          <a className="fde-nav-cta" href={`${anchorPrefix}#contact`}>
            {content.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
