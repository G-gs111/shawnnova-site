import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import type { Locale, Project } from "@/content/portfolio";

type CaseEvidenceListProps = {
  projects: Project[];
  locale: Locale;
  routePrefix: string;
  viewCaseLabel: string;
};

export function CaseEvidenceList({
  projects,
  locale,
  routePrefix,
  viewCaseLabel,
}: CaseEvidenceListProps) {
  const labels = locale === "zh"
    ? { problem: "问题", built: "构建", adopted: "采用", proof: "证据" }
    : { problem: "Problem", built: "Built", adopted: "Adopted", proof: "Evidence" };
  const fields = ["problem", "built", "adopted", "proof"] as const;

  return (
    <div className="fde-case-evidence-list">
      {projects.map((project) => (
        <article className="fde-case-evidence-row" key={project.slug}>
          <header>
            <span>{project.index} / {project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <Link href={`${routePrefix}/projects/${project.slug}`}>
              {viewCaseLabel}
              <span className="fde-visually-hidden">：{project.title}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </header>
          <dl>
            {fields.map((field) => (
              <div key={field}>
                <dt>{labels[field]}</dt>
                <dd>{project.evidence[field]}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}
