import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { siteContent } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#about">
        <span>{siteContent.identity.name}</span>
        <span className="brand-alias">{siteContent.identity.alias}</span>
      </a>

      <nav className="desktop-nav" aria-label="主要导航">
        {siteContent.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="header-link"
        href={siteContent.contact.href}
        target="_blank"
        rel="noreferrer"
        aria-label="访问 Shawnnova 的 GitHub"
      >
        <GithubLogo size={20} weight="regular" aria-hidden="true" />
        <span>GitHub</span>
        <ArrowUpRight size={15} weight="regular" aria-hidden="true" />
      </a>
    </header>
  );
}
