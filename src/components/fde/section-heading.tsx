type SectionHeadingProps = {
  kicker: string;
  title: string;
  intro?: string;
  id: string;
};

export function SectionHeading({ kicker, title, intro, id }: SectionHeadingProps) {
  return (
    <header className="fde-section-heading">
      <p className="fde-section-kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}
