import type { Metric } from "@/content/portfolio";

type EvidenceStripProps = {
  metrics: Metric[];
  label: string;
};

export function EvidenceStrip({ metrics, label }: EvidenceStripProps) {
  return (
    <section className="fde-evidence-strip" aria-label={label}>
      {metrics.map((metric, index) => (
        <article key={metric.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{metric.value}</strong>
          <p>{metric.label}</p>
          {metric.note ? <small>{metric.note}</small> : null}
        </article>
      ))}
    </section>
  );
}
