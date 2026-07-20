import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function ApproachSection() {
  return (
    <section className="approach-section section-shell" id="approach">
      <div className="approach-intro">
        <p>我的方法</p>
        <h2>从真实问题开始，直到细节感觉正确。</h2>
      </div>

      <div className="approach-list">
        {siteContent.approach.map((item, index) => (
          <Reveal delay={index * 0.06} key={item.title}>
            <article>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
