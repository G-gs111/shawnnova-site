"use client";

import {
  ArrowsClockwise,
  BracketsCurly,
  MagnifyingGlass,
  RocketLaunch,
} from "@phosphor-icons/react";
import { useState } from "react";

import type { DeliveryStage, Locale } from "@/content/portfolio";

type DeliveryConsoleProps = {
  stages: [DeliveryStage, DeliveryStage, DeliveryStage, DeliveryStage];
  locale: Locale;
};

const icons = [MagnifyingGlass, BracketsCurly, RocketLaunch, ArrowsClockwise] as const;

export function DeliveryConsole({ stages, locale }: DeliveryConsoleProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const label = locale === "zh" ? "交付控制台" : "Delivery console";

  return (
    <section className="fde-delivery-console" aria-label={label}>
      <header>
        <span>{label}</span>
        <strong>{locale === "zh" ? "从问题到采用" : "From problem to adoption"}</strong>
      </header>
      <ol>
        {stages.map((stage, index) => {
          const Icon = icons[index];
          const active = index === activeIndex;
          return (
            <li className={active ? "is-active" : undefined} key={stage.title}>
              <button
                type="button"
                aria-current={active ? "step" : undefined}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="fde-console-index">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={19} weight={active ? "fill" : "regular"} aria-hidden="true" />
                <span className="fde-console-copy">
                  <strong>{stage.title}</strong>
                  <small>{stage.summary}</small>
                  <p>{stage.detail}</p>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
