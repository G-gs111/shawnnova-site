import { icons as logoCollection } from "@iconify-json/logos";

import type { ToolGroup } from "@/content/portfolio";

type ToolIcon = NonNullable<ToolGroup["tools"][number]["icon"]>;

const logoNames: Partial<Record<ToolIcon, string>> = {
  python: "python",
  nodejs: "nodejs-icon",
  fastapi: "fastapi-icon",
  deepseek: "deepseek-icon",
  openai: "openai-icon",
  github: "github-icon",
};

export function ToolLogo({ icon, label }: { icon?: ToolIcon; label: string }) {
  if (!icon) return <span className="fde-tool-mark is-text" aria-hidden="true">·</span>;
  if (icon === "feishu") {
    return <span className="fde-tool-mark is-feishu" role="img" aria-label={`${label} logo`} />;
  }
  if (icon === "tencent") {
    return <span className="fde-tool-mark is-tencent" role="img" aria-label={`${label} logo`}>T</span>;
  }

  const iconName = logoNames[icon];
  const logo = iconName ? logoCollection.icons[iconName] : undefined;
  if (!logo) return <span className="fde-tool-mark is-text" aria-hidden="true">·</span>;
  const width = logo.width ?? logoCollection.width ?? 24;
  const height = logo.height ?? logoCollection.height ?? width;

  return (
    <svg
      className="fde-tool-mark"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${label} logo`}
      dangerouslySetInnerHTML={{ __html: logo.body }}
    />
  );
}
