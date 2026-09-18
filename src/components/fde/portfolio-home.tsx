import { ArrowDownRight, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  getFeaturedProjects,
  getHomeContent,
  getSupportingProjects,
  type Locale,
} from "@/content/portfolio";

import { CaseEvidenceList } from "./case-evidence-list";
import { ContactBlock } from "./contact-block";
import { DeliveryConsole } from "./delivery-console";
import { DeliveryPipeline } from "./delivery-pipeline";
import { EvidenceStrip } from "./evidence-strip";
import { SectionHeading } from "./section-heading";
import { SiteNav } from "./site-nav";

type PortfolioHomeProps = { locale: Locale };

export function PortfolioHome({ locale }: PortfolioHomeProps) {
  const content = getHomeContent(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const supportingProject = getSupportingProjects(locale)[0];
  const routePrefix = locale === "zh" ? "" : "/en";

  return (
    <div className={`fde-site is-${locale}`}>
      <SiteNav content={content} />
      <main>
        <section className="fde-hero" id="about">
          <div className="fde-hero-copy">
            <p className="fde-kicker">{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            {content.hero.englishLine ? <p className="fde-hero-english">{content.hero.englishLine}</p> : null}
            <p className="fde-hero-summary">{content.hero.summary}</p>
            <div className="fde-hero-actions">
              <a className="fde-button fde-button-primary" href="#work">
                {content.hero.primaryCta}
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <a className="fde-text-link" href="#contact">
                {content.hero.secondaryCta}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="fde-hero-visual">
            <DeliveryConsole stages={content.delivery.stages} locale={locale} />
          </div>
        </section>

        <div className="fde-metrics" id="metrics">
          <span className="fde-anchor-alias" id="proof" />
          <EvidenceStrip metrics={content.metrics} label={content.metricsLabel} />
        </div>

        <section className="fde-work fde-section" id="work" aria-labelledby="work-title">
          <SectionHeading
            kicker={content.work.kicker}
            title={content.work.title}
            intro={content.work.intro}
            id="work-title"
          />
          <CaseEvidenceList
            projects={featuredProjects}
            locale={locale}
            viewCaseLabel={content.work.viewCase}
            routePrefix={routePrefix}
          />
        </section>

        <section className="fde-method fde-section" id="method" aria-labelledby="method-title">
          <span className="fde-anchor-alias" id="approach" />
          <SectionHeading
            kicker={content.capabilities.kicker}
            title={content.capabilities.title}
            intro={content.capabilities.intro}
            id="method-title"
          />
          <ol className="fde-method-list">
            {content.capabilities.items.map((item) => (
              <li key={item.index}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <strong>{item.summary}</strong>
                <p>{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="fde-experience fde-section" id="experience" aria-labelledby="experience-title">
          <SectionHeading
            kicker={content.experience.kicker}
            title={content.experience.title}
            intro={content.experience.intro}
            id="experience-title"
          />
          <div className="fde-experience-facts">
            {content.experience.facts.map((fact, index) => (
              <article key={fact.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fde-systems fde-section" id="tools" aria-labelledby="systems-title">
          <SectionHeading
            kicker={content.systems.kicker}
            title={content.systems.title}
            intro={content.systems.intro}
            id="systems-title"
          />
          {supportingProject ? (
            <article className="fde-supporting-system">
              <header>
                <span>{locale === "zh" ? "补充交付 / 04" : "Supporting delivery / 04"}</span>
                <h3>{supportingProject.title}</h3>
                <p>{supportingProject.summary}</p>
                <Link href={`${routePrefix}/projects/${supportingProject.slug}`}>
                  {content.work.viewCase}<ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </header>
              <dl>
                {supportingProject.cardFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p>{supportingProject.boundary}</p>
            </article>
          ) : null}
          <DeliveryPipeline groups={content.systems.groups} locale={locale} />
        </section>

        <ContactBlock content={content.contact} locale={locale} />
      </main>
      <footer className="fde-footer">
        <p>{content.footer.statement}</p>
        <small>{content.footer.note}</small>
        <small>© 2026</small>
      </footer>
    </div>
  );
}
