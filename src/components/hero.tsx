import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { HeroVisual } from "@/components/motion/hero-visual";
import { Reveal } from "@/components/motion/reveal";
import { siteContent } from "@/content/site";

export function Hero() {
  return (
    <section className="hero section-shell" id="about">
      <Reveal className="hero-copy">
        <p className="hero-eyebrow">
          {siteContent.identity.alias} / {siteContent.identity.role}
        </p>
        <h1>{siteContent.identity.headline}</h1>
        <p className="hero-introduction">{siteContent.identity.introduction}</p>
        <p className="hero-motto">{siteContent.identity.motto}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            查看作品
            <ArrowDown size={17} weight="regular" aria-hidden="true" />
          </a>
          <a
            className="button button-secondary"
            href={siteContent.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={17} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </Reveal>

      <HeroVisual />
    </section>
  );
}
