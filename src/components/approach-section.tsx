import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function ApproachSection() {
  return (
    <section className="collaboration-section section-shell" id="collaboration">
      <div className="collaboration-heading">
        <h2>可以一起推进的事情</h2>
        <p>{siteContent.identity.motto}</p>
      </div>

      <div className="collaboration-list">
        {siteContent.collaboration.map((item, index) => (
          <Reveal delay={index * 0.06} key={item.title}>
            <article>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowDownRight size={28} weight="regular" aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </div>

      <div className="process-line" aria-label="工作方式">
        {siteContent.approach.map((item) => (
          <div key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
