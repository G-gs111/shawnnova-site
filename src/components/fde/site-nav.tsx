"use client";

import Link from "next/link";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

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
  const ticking = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      setCompact(window.scrollY > 72);
      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateDock = (event: ReactPointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    navRef.current?.querySelectorAll<HTMLElement>(".fde-dock-item").forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (bounds.left + bounds.width / 2),
        event.clientY - (bounds.top + bounds.height / 2),
      );
      item.style.setProperty("--dock-strength", String(Math.max(0, 1 - distance / 150)));
    });
  };

  const resetDock = () => {
    navRef.current?.querySelectorAll<HTMLElement>(".fde-dock-item").forEach((item) => {
      item.style.removeProperty("--dock-strength");
    });
  };

  return (
    <header className={`fde-nav-shell${compact ? " is-compact" : ""}`}>
      <nav
        ref={navRef}
        className="fde-nav"
        aria-label={content.locale === "zh" ? "主导航" : "Primary navigation"}
        onPointerMove={updateDock}
        onPointerLeave={resetDock}
      >
        <Link className="fde-wordmark fde-dock-item" href={homeHref}>
          <span>SHAWNNOVA</span>
          <small>FDE / AI SYSTEMS</small>
        </Link>
        <div className="fde-nav-links">
          <a className="fde-dock-item" href={`${anchorPrefix}#work`}>{content.nav.work}</a>
          <a className="fde-dock-item" href={`${anchorPrefix}#method`}>{content.nav.method}</a>
          <a className="fde-dock-item" href={`${anchorPrefix}#contact`}>{content.nav.contact}</a>
        </div>
        <div className="fde-nav-actions">
          <span className="fde-dock-item">
            <LanguageLink
              href={languageHref}
              label={content.nav.language}
              currentLang={content.lang}
              targetLang={content.locale === "zh" ? "en" : "zh-CN"}
            />
          </span>
          <a className="fde-nav-cta fde-dock-item" href={`${anchorPrefix}#contact`}>
            {content.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
