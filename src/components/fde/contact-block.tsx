import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

import { ContactForm } from "@/components/contact-form";
import { type Locale, type LocalizedHomeContent, publicContact } from "@/content/portfolio";

const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "https://contact-api.260604.xyz";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type ContactBlockProps = {
  content: LocalizedHomeContent["contact"];
  locale: Locale;
};

export function ContactBlock({ content, locale }: ContactBlockProps) {
  return (
    <section className="fde-contact" id="contact" aria-labelledby="contact-title">
      <div className="fde-contact-copy">
        <p className="fde-section-kicker">{content.kicker}</p>
        <h2 id="contact-title">{content.title}</h2>
        <p>{content.intro}</p>
        <address className="fde-contact-routes">
          <a href={`mailto:${publicContact.email}`}>
            <span><EnvelopeSimple size={18} aria-hidden="true" />{content.emailLabel}</span>
            <strong>{publicContact.email}</strong>
          </a>
          <a href={`tel:${publicContact.phone}`}>
            <span><Phone size={18} aria-hidden="true" />{content.phoneLabel}</span>
            <strong>{publicContact.phone}</strong>
          </a>
        </address>
      </div>
      <div className="fde-contact-panel">
        <header>
          <h3>{content.formTitle}</h3>
          <p>{content.formNote}</p>
        </header>
        <ContactForm
          endpoint={contactEndpoint}
          turnstileSiteKey={turnstileSiteKey}
          locale={locale}
        />
      </div>
    </section>
  );
}
