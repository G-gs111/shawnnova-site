"use client";

import { useEffect } from "react";

type LanguageLinkProps = {
  href: string;
  label: string;
  currentLang: string;
  targetLang: string;
};

const scrollKey = "shawnnova-language-scroll";

export function LanguageLink({ href, label, currentLang, targetLang }: LanguageLinkProps) {
  useEffect(() => {
    document.documentElement.lang = currentLang;
    const stored = window.sessionStorage.getItem(scrollKey);
    if (!stored || window.location.hash) return;
    window.sessionStorage.removeItem(scrollKey);
    const y = Number(stored);
    if (Number.isFinite(y)) {
      window.requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    }
  }, [currentLang]);

  return (
    <a
      className="fde-language-link"
      href={href}
      hrefLang={targetLang}
      onClick={(event) => {
        event.preventDefault();
        window.sessionStorage.setItem(scrollKey, String(window.scrollY));
        window.location.assign(`${href}${window.location.hash}`);
      }}
    >
      {label}
    </a>
  );
}
