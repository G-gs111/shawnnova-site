"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

import type { Locale, Project } from "@/content/portfolio";

import { SystemDiagram } from "./system-diagram";

type ProjectSignalStackProps = {
  projects: Project[];
  locale: Locale;
  viewCaseLabel: string;
  diagramLabel: string;
  routePrefix: string;
};

export function ProjectSignalStack({
  projects,
  locale,
  viewCaseLabel,
  diagramLabel,
  routePrefix,
}: ProjectSignalStackProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!activeProject) return null;

  const regionLabel = locale === "zh" ? "项目证据台" : "Project evidence console";
  const diagnosticLabel = locale === "zh"
    ? `${activeProject.title}诊断`
    : `${activeProject.title} diagnostic`;

  return (
    <section className="fde-signal-stack" aria-label={regionLabel}>
      <div className="fde-signal-selectors">
        {projects.map((project) => {
          const active = project.slug === activeProject.slug;
          return (
            <article className={`fde-signal-selector${active ? " is-active" : ""}`} key={project.slug}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
              >
                <span className="fde-signal-index">{project.index}</span>
                <span className="fde-signal-copy">
                  <small>{project.category}</small>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </span>
              </button>
              <Link
                href={`${routePrefix}/projects/${project.slug}`}
                aria-label={`${locale === "zh" ? "查看" : "View "}${project.title}`}
              >
                <span>{viewCaseLabel}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>

      <section
        key={activeProject.slug}
        className="fde-signal-diagnostic"
        aria-label={diagnosticLabel}
        aria-live="polite"
      >
        <header>
          <span>{locale === "zh" ? "当前信号" : "Active signal"}</span>
          <strong>{activeProject.status}</strong>
        </header>
        <dl>
          {activeProject.cardFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <SystemDiagram compact label={diagramLabel} steps={activeProject.flow.slice(0, 4)} />
      </section>
    </section>
  );
}
