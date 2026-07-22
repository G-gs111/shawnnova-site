"use client";

import { useEffect, useMemo, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type ObservedSection = {
  id: string;
  isIntersecting: boolean;
  intersectionRatio: number;
};

export function pickActiveSection(
  entries: ObservedSection[],
  items: readonly NavigationItem[],
) {
  const known = new Set(items.map((item) => item.href.slice(1)));
  const visible = entries
    .filter((entry) => entry.isIntersecting && known.has(entry.id))
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

  return visible[0] ? `#${visible[0].id}` : undefined;
}

export function ActiveNav({ items }: { items: readonly NavigationItem[] }) {
  const initialHref = items[0]?.href ?? "";
  const [activeHref, setActiveHref] = useState(initialHref);
  const sectionIds = useMemo(
    () => items.map((item) => item.href.slice(1)).filter(Boolean),
    [items],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nextHref = pickActiveSection(
          entries.map((entry) => ({
            id: entry.target.id,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
          })),
          items,
        );

        if (nextHref) setActiveHref(nextHref);
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.45, 0.7],
      },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [items, sectionIds]);

  return (
    <nav className="desktop-nav" aria-label="主要导航">
      {items.map((item) => (
        <a
          className={activeHref === item.href ? "is-active" : undefined}
          href={item.href}
          key={item.href}
          aria-current={activeHref === item.href ? "location" : undefined}
          onClick={() => setActiveHref(item.href)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
