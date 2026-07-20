import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function WorkSection() {
  const [featured, ...supporting] = siteContent.work;

  return (
    <section className="work-section section-shell" id="work">
      <div className="section-heading vertical-heading">
        <h2>正在构建</h2>
        <p>技术不是展示品。它应该缩短路径，解决问题，并留下清晰的使用感受。</p>
      </div>

      <div className="work-grid">
        <Reveal className="work-featured">
          <article>
            <div className="work-image work-image-large">
              <Image
                src={featured.image}
                alt={featured.alt}
                fill
                sizes="(max-width: 767px) 100vw, 66vw"
              />
            </div>
            <div className="work-copy">
              <span>{featured.kind}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
          </article>
        </Reveal>

        <div className="work-supporting">
          {supporting.map((item, index) => (
            <Reveal delay={index * 0.08} key={item.title}>
              <article className="work-compact">
                <div className={`work-image work-image-small crop-${index + 1}`}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 32vw"
                  />
                </div>
                <div className="work-compact-copy">
                  <span>{item.kind}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <a
        className="text-link"
        href={siteContent.contact.href}
        target="_blank"
        rel="noreferrer"
      >
        查看 GitHub
        <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
      </a>
    </section>
  );
}
