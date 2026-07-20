import { siteContent } from "@/content/site";

export function MottoBand() {
  return (
    <aside className="motto-band section-shell" aria-label="个人信条">
      <p>{siteContent.identity.motto}</p>
    </aside>
  );
}
