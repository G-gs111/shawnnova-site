type FlowStep = { title: string; detail: string };

type SystemDiagramProps = {
  label: string;
  steps: FlowStep[];
  compact?: boolean;
};

export function SystemDiagram({ label, steps, compact = false }: SystemDiagramProps) {
  return (
    <figure className={`fde-system-diagram${compact ? " is-compact" : ""}`}>
      <figcaption>{label}</figcaption>
      <ol>
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
