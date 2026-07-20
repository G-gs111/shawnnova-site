import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { siteContent } from "@/content/site";

export function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-main">
        <p>{siteContent.contact.note}</p>
        <h2>一起做点值得留下的东西。</h2>
        <div className="contact-routes">
          <a className="contact-link" href={`mailto:${siteContent.contact.email}`}>
            <EnvelopeSimple size={24} weight="regular" aria-hidden="true" />
            {siteContent.contact.email}
            <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          </a>
          <a className="contact-link" href={`tel:${siteContent.contact.phone}`}>
            <Phone size={24} weight="regular" aria-hidden="true" />
            {siteContent.contact.phone}
            <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          </a>
          <a
            className="contact-link contact-link-secondary"
            href={siteContent.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogo size={24} weight="regular" aria-hidden="true" />
            GitHub
            <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>

      <footer>
        <span>{siteContent.identity.name}</span>
        <span>{siteContent.identity.alias}</span>
      </footer>
    </section>
  );
}
