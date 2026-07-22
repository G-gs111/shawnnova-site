import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

import { HeroMask } from "@/components/hero-mask";
import { siteContent } from "@/content/site";

export function Hero() {
  return (
    <section className="hero section-shell" id="about">
      <HeroMask image={siteContent.heroVisual.image}>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">{siteContent.identity.role}</p>
            <h1>{siteContent.identity.headline}</h1>
            <p className="hero-introduction">
              {siteContent.identity.introduction}
            </p>
          </div>

          <div className="hero-name" aria-hidden="true">
            <span>SHAWN</span>
            <span>NOVA</span>
          </div>
        </div>
      </HeroMask>

      <div className="hero-actions">
        <a className="button button-primary" href="#work">
          查看项目
          <ArrowDown size={17} weight="regular" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
