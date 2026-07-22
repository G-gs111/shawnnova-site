import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

import { ActiveNav } from "@/components/active-nav";
import { siteContent } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#about">
        <span>{siteContent.identity.name}</span>
        <span className="brand-alias">{siteContent.identity.alias}</span>
      </a>

      <ActiveNav items={siteContent.navigation} />

      <a
        className="header-link"
        href={`mailto:${siteContent.contact.email}`}
        aria-label={`发送邮件至 ${siteContent.contact.email}`}
      >
        <EnvelopeSimple size={20} weight="regular" aria-hidden="true" />
        <span>联系我</span>
        <ArrowUpRight size={15} weight="regular" aria-hidden="true" />
      </a>
    </header>
  );
}
