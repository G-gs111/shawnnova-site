import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function ExperienceSection() {
  return (
    <section className="experience-section section-shell" id="experience">
      <div className="experience-intro">
        <p className="section-kicker">复合经验</p>
        <h2>从市场一线，到产品落地。</h2>
        <p>
          不同岗位带来的不是分散标签，而是一条从理解需求到完成交付的完整路径。
        </p>
      </div>

      <div className="experience-list">
        {siteContent.experience.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.title}>
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
