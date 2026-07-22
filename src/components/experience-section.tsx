import { Reveal } from "@/components/motion/reveal";
import { ToolStrip } from "@/components/tool-strip";
import { siteContent } from "@/content/site";

export function ExperienceSection() {
  return (
    <section className="experience-section section-shell" id="experience">
      <div className="experience-heading">
        <h2>经历不是标签，是一条交付路径。</h2>
        <p>
          从一线需求、运营增长到产品开发，我在不同场景里做的是同一件事：把问题推进到结果。
        </p>
      </div>

      <div className="experience-timeline">
        {siteContent.experience.map((item, index) => (
          <Reveal delay={index * 0.05} key={`${item.period}-${item.title}`}>
            <article>
              <div className="experience-meta">
                <time>{item.period}</time>
                <span>{item.organization}</span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <aside className="proof-strip" aria-label="教育与奖项">
        <div>
          <span>教育</span>
          <strong>{siteContent.proof.education}</strong>
          <small>{siteContent.proof.rank}</small>
        </div>
        <ul>
          {siteContent.proof.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </aside>

      <ToolStrip />
    </section>
  );
}
