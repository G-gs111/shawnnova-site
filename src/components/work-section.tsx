import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function WorkSection() {
  return (
    <section className="work-section section-shell" id="work">
      <div className="section-heading section-heading-work">
        <h2>代表项目</h2>
        <p>项目是否成熟，先看状态是否真实，再看它解决了什么问题。</p>
      </div>

      <div className="project-list">
        {siteContent.work.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.title}>
            <article className="project-card">
              <div className="project-media">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                />
              </div>

              <div className="project-copy">
                <div className="project-meta">
                  <span>{item.status}</span>
                  <span>{item.client}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="project-description">{item.description}</p>
                <p className="project-outcome">{item.outcome}</p>
                <ul className="project-features" aria-label={`${item.title}能力`}>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {"href" in item ? (
                  <a
                    className="project-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    查看线上版本
                    <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
