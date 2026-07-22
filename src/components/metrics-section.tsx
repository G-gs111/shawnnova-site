import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function MetricsSection() {
  return (
    <section className="metrics-section section-shell" id="capability">
      <div className="section-heading">
        <h2>把判断，变成结果。</h2>
        <p>
          我经历过销售、运营、组织协作和产品开发，也习惯用数据检验行动是否有效。
        </p>
      </div>

      <div className="metrics-grid">
        {siteContent.metrics.map((item, index) => (
          <Reveal delay={index * 0.06} key={item.label}>
            <article className={`metric metric-${index + 1}`}>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
