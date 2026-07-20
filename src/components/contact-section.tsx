import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { siteContent } from "@/content/site";

export function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-main">
        <p>{siteContent.contact.note}</p>
        <h2>一起做点值得留下的东西。</h2>
        <a
          className="contact-link"
          href={siteContent.contact.href}
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo size={26} weight="regular" aria-hidden="true" />
          {siteContent.contact.label}
          <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
        </a>
      </div>

      <footer>
        <span>{siteContent.identity.name}</span>
        <span>{siteContent.identity.alias}</span>
      </footer>
    </section>
  );
}
