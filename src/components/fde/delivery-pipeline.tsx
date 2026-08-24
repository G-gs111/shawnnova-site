"use client";

import { useState } from "react";

import type { Locale, ToolGroup } from "@/content/portfolio";

import { ToolLogo } from "./tool-logo";

type DeliveryPipelineProps = {
  groups: ToolGroup[];
  locale: Locale;
};

export function DeliveryPipeline({ groups, locale }: DeliveryPipelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex] ?? groups[0];

  if (!activeGroup) return null;

  return (
    <section
      className="fde-delivery-pipeline"
      aria-label={locale === "zh" ? "交付链路" : "Delivery pipeline"}
    >
      <div className="fde-pipeline-track" role="list">
        {groups.map((group, index) => {
          const active = index === activeIndex;
          return (
            <div className={`fde-pipeline-node${active ? " is-active" : ""}`} role="listitem" key={group.stage}>
              <button
                type="button"
                aria-label={group.stage}
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{group.stage}</strong>
              </button>
            </div>
          );
        })}
      </div>

      <div className="fde-pipeline-detail" aria-live="polite">
        <p>{activeGroup.purpose}</p>
        <ul>
          {activeGroup.tools.map((tool) => (
            <li key={tool.label}>
              <ToolLogo icon={tool.icon} label={tool.label} />
              <span>{tool.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
