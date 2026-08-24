import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  getHomeContent,
  getProjects,
  type Locale,
  type Project,
} from "@/content/portfolio";

import { SiteNav } from "./site-nav";
import { SystemDiagram } from "./system-diagram";

type CasePageProps = { locale: Locale; project: Project };

const labels = {
  zh: {
    back: "返回全部案例",
    problem: "业务问题",
    role: "我的职责",
    flow: "系统流程示意",
    flowNote: "为保护业务信息，以下为脱敏的 HTML 结构示意，不是仿造产品截图。",
    decisions: "关键决策",
    results: "结果",
    boundary: "边界",
    review: "复盘",
    next: "下一个案例",
    contact: "讨论类似问题",
  },
  en: {
    back: "Back to all case studies",
    problem: "Business problem",
    role: "My responsibility",
    flow: "System flow illustration",
    flowNote: "This is an anonymized HTML structure diagram—not a simulated product screenshot.",
    decisions: "Key decisions",
    results: "Outcomes",
    boundary: "Boundary",
    review: "Retrospective",
    next: "Next case study",
    contact: "Discuss a similar problem",
  },
} as const;

export function CasePage({ locale, project }: CasePageProps) {
  const content = getHomeContent(locale);
  const copy = labels[locale];
  const routePrefix = locale === "zh" ? "" : "/en";
  const projects = getProjects(locale);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const alternateHref = locale === "zh"
    ? `/en/projects/${project.slug}`
    : `/projects/${project.slug}`;
  const homeHref = locale === "zh" ? "/" : "/en";

  return (
    <div className={`fde-site fde-case-site is-${locale}`}>
      <SiteNav
        content={content}
        homeHref={homeHref}
        languageHref={alternateHref}
        anchorPrefix={homeHref}
      />
      <main>
        <header className="fde-case-hero">
          <Link className="fde-case-back" href={`${homeHref}#work`}>
            <ArrowLeft size={17} aria-hidden="true" />{copy.back}
          </Link>
          <div className="fde-case-heading">
            <p className="fde-kicker">Case {project.index} / {project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          <aside className="fde-case-status">
            <span>{locale === "zh" ? "交付状态" : "Delivery status"}</span>
            <strong>{project.status}</strong>
          </aside>
        </header>

        <section className="fde-case-overview" aria-label={locale === "zh" ? "项目概览" : "Project overview"}>
          <article>
            <span>01</span><h2>{copy.problem}</h2><p>{project.problem}</p>
          </article>
          <article>
            <span>02</span><h2>{copy.role}</h2><p>{project.role}</p>
          </article>
        </section>

        <section className="fde-case-section fde-case-flow" aria-labelledby="case-flow-title">
          <header>
            <p className="fde-section-kicker">System / 03</p>
            <h2 id="case-flow-title">{copy.flow}</h2>
            <p>{copy.flowNote}</p>
          </header>
          <SystemDiagram label={copy.flow} steps={project.flow} />
        </section>

        <section className="fde-case-section fde-case-decisions" aria-labelledby="case-decisions-title">
          <header>
            <p className="fde-section-kicker">Decisions / 04</p>
            <h2 id="case-decisions-title">{copy.decisions}</h2>
          </header>
          <ol>
            {project.decisions.map((decision, index) => (
              <li key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <p>{decision.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="fde-case-section fde-case-results" aria-labelledby="case-results-title">
          <header>
            <p className="fde-section-kicker">Proof / 05</p>
            <h2 id="case-results-title">{copy.results}</h2>
          </header>
          <dl>
            {project.results.map((result) => (
              <div key={result.label}>
                <dt>{result.label}</dt><dd>{result.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fde-case-notes">
          <article>
            <p className="fde-section-kicker">Boundary / 06</p>
            <h2>{copy.boundary}</h2>
            <p>{project.boundary}</p>
          </article>
          <article>
            <p className="fde-section-kicker">Review / 07</p>
            <h2>{copy.review}</h2>
            <p>{project.retrospective}</p>
          </article>
        </section>

        <nav className="fde-case-next" aria-label={copy.next}>
          <div>
            <span>{copy.next}</span>
            <Link href={`${routePrefix}/projects/${nextProject.slug}`}>
              {nextProject.shortTitle}<ArrowRight size={24} aria-hidden="true" />
            </Link>
          </div>
          <a className="fde-button fde-button-primary" href={`${homeHref}#contact`}>
            {copy.contact}<ArrowRight size={18} aria-hidden="true" />
          </a>
        </nav>
      </main>
      <footer className="fde-footer">
        <p>{content.footer.statement}</p>
        <small>{content.footer.note}</small>
        <small>© 2026</small>
      </footer>
    </div>
  );
}
