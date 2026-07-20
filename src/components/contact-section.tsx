import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { ContactForm } from "@/components/contact-form";
import { siteContent } from "@/content/site";

export function ContactSection() {
  const endpoint =
    process.env.NEXT_PUBLIC_CONTACT_API_URL ??
    "https://contact-api.260604.xyz";
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-layout">
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

        <div className="contact-panel">
          <p className="section-kicker">留下线索</p>
          <h3>也可以让我来联系你。</h3>
          <ContactForm endpoint={endpoint} turnstileSiteKey={turnstileSiteKey} />
        </div>
      </div>

      <footer>
        <span>{siteContent.identity.name}</span>
        <span>{siteContent.identity.alias}</span>
      </footer>
    </section>
  );
}
