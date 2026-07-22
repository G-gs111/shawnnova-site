import { describe, expect, it } from "vitest";

import { siteContent } from "./site";

describe("siteContent", () => {
  it("positions Shawnnova as a business-minded product builder", () => {
    expect(siteContent.identity).toMatchObject({
      name: "葛少玉",
      alias: "Shawnnova",
      role: "业务型产品构建者",
      headline: "从业务现场，到可用产品。",
      motto: "功不唐捐，玉汝于成",
    });
  });

  it("uses only resume-backed evidence", () => {
    expect(siteContent.metrics.map((item) => item.value)).toEqual([
      "1/67",
      "100+",
      "6000+",
      "200%+",
    ]);
    expect(siteContent.metrics.map((item) => item.label)).toEqual([
      "专业排名",
      "服务家长",
      "内容账号关注",
      "双 11 营业额增长",
    ]);
  });

  it("states every project status and anonymizes the pet-commerce client", () => {
    expect(siteContent.work.map((item) => [item.title, item.status])).toEqual([
      ["宠物达人内容运营工作台", "已上线"],
      ["Shawnnova 个人站", "已上线"],
      ["AI 混剪工具", "开发中"],
      ["企业自动化工作流", "探索中"],
    ]);
    expect(siteContent.work[0].client).toBe("某宠物内容电商机构");
    expect(JSON.stringify(siteContent)).not.toContain("色彩萌宠");
  });

  it("keeps education compact and outside the main experience list", () => {
    expect(siteContent.experience.map((item) => item.title)).toEqual([
      "店铺运营与增长",
      "业务产品构建",
      "物流运营与项目优化",
      "平台运营与组织协作",
    ]);
    expect(siteContent.proof.education).toBe("武汉科技大学 物流管理 本科");
    expect(siteContent.proof.awards).toHaveLength(3);
  });

  it("preserves the verified contact routes and working tools", () => {
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
