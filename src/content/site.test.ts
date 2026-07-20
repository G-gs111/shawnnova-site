import { describe, expect, it } from "vitest";

import { siteContent } from "./site";

describe("siteContent", () => {
  it("describes Shawnnova with honest portfolio content", () => {
    expect(siteContent.identity.name).toBe("葛少玉");
    expect(siteContent.identity.alias).toBe("Shawnnova");
    expect(siteContent.identity.motto).toBe("功不唐捐，玉汝于成");
    expect(siteContent.experience.map((item) => item.title)).toEqual([
      "运营",
      "销售",
      "产品开发",
      "Vibe Coding",
    ]);
    expect(siteContent.heroVisual).toEqual({
      image: "/images/shawnnova-hero-studio-v2.webp",
      alt: "创作者从侧后方坐在工作室中，将产品草图做成数字原型",
    });
    expect(siteContent.work).toHaveLength(4);
    expect(siteContent.work.map((item) => item.title)).toEqual([
      "带货短视频达人工具网站",
      "AI 混剪工具",
      "个人站开发",
      "企业自动化工作流开发",
    ]);
    expect(siteContent.work.map((item) => item.image)).toEqual([
      "/images/shawnnova-commerce-creator-v2.webp",
      "/images/shawnnova-video-workflow-v2.webp",
      "/images/shawnnova-desktop-product-v2.webp",
      "/images/shawnnova-business-automation-v2.webp",
    ]);
    expect(new Set(siteContent.work.map((item) => item.image)).size).toBe(4);
    expect(siteContent.work.every((item) => item.alt.length > 10)).toBe(true);
    expect(siteContent.tools.map((item) => item.label)).toEqual([
      "Codex",
      "飞书",
      "GitHub",
      "VS Code",
      "Cloudflare",
      "Vercel",
    ]);
    expect(siteContent.contact.email).toBe("shawnnovags111@gmail.com");
    expect(siteContent.contact.phone).toBe("18379582410");
    expect(siteContent.contact.github).toBe("https://github.com/G-gs111");
  });
});
