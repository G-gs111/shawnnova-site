import { icons as logoCollection } from "@iconify-json/logos";

import { siteContent } from "@/content/site";

const logoNames = {
  cloudflare: "cloudflare-icon",
  github: "github-icon",
  openai: "openai-icon",
  vercel: "vercel-icon",
  visualstudiocode: "visual-studio-code",
} as const;

export function ToolStrip() {
  return (
    <section className="tool-strip section-shell" aria-labelledby="tools-title">
      <div className="tool-strip-heading">
        <p className="section-kicker">Daily stack</p>
        <h2 id="tools-title">常用工具</h2>
      </div>

      <ul className="tool-list" aria-label="常用工具列表">
        {siteContent.tools.map((tool) => {
          if (tool.icon === "feishu") {
            return (
              <li key={tool.label} tabIndex={0}>
                <span
                  className="tool-logo tool-logo-feishu"
                  role="img"
                  aria-label="飞书图标"
                />
                <span>{tool.label}</span>
              </li>
            );
          }

          const icon = logoCollection.icons[logoNames[tool.icon]];
          const width = icon.width ?? logoCollection.width ?? 24;
          const height = icon.height ?? logoCollection.height ?? width;

          return (
            <li key={tool.label} tabIndex={0}>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label={`${tool.label} 图标`}
                dangerouslySetInnerHTML={{ __html: icon.body }}
              />
              <span>{tool.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
