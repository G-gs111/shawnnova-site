import { describe, expect, it } from "vitest";

import {
  getHomeContent,
  getProject,
  getProjects,
  projectSlugs,
  publicContact,
} from "./portfolio";

describe("portfolio content", () => {
  it("keeps all three case routes in both languages", () => {
    expect(projectSlugs).toEqual([
      "content-compliance",
      "selection-dashboard",
      "qianchuan-cockpit",
    ]);
    expect(getProjects("zh").map((project) => project.slug)).toEqual(projectSlugs);
    expect(getProjects("en").map((project) => project.slug)).toEqual(projectSlugs);
  });

  it("keeps quantitative results aligned across locales", () => {
    for (const slug of projectSlugs) {
      const zh = getProject("zh", slug);
      const en = getProject("en", slug);
      expect(zh).toBeDefined();
      expect(en).toBeDefined();
      expect(zh?.results.map((item) => item.key ?? item.value)).toEqual(
        en?.results.map((item) => item.key ?? item.value),
      );
    }
  });

  it("states the partial acceptance boundary honestly", () => {
    const zh = getProject("zh", "qianchuan-cockpit");
    const en = getProject("en", "qianchuan-cockpit");
    expect(zh?.status).toContain("验收中");
    expect(zh?.boundary).toContain("部分 WorkBuddy 控制能力仍在验收");
    expect(en?.status).toContain("acceptance");
  });

  it("keeps public contact and homepage proof fixed", () => {
    expect(publicContact).toMatchObject({
      email: "shawnnovags111@gmail.com",
      phone: "18379582410",
    });
    expect(getHomeContent("zh").metrics.map((item) => item.value)).toEqual([
      "6",
      "1,000+",
      "210",
      "5",
    ]);
    expect(getHomeContent("zh").hero.title).toBe("把一线业务问题，做成能跑的系统。");
    expect(getHomeContent("en").hero.title).toBe(
      "I turn frontline business problems into systems teams can use.",
    );
    expect(getHomeContent("zh").contact.formNote).not.toContain("QQ");
    expect(getHomeContent("en").contact.formNote).not.toContain("QQ");
  });

  it("keeps only the strongest three result proofs per case", () => {
    for (const locale of ["zh", "en"] as const) {
      for (const slug of projectSlugs) {
        expect(getProject(locale, slug)?.results).toHaveLength(3);
      }
    }
  });

  it("does not expose forbidden names or account identifiers", () => {
    const publicCopy = JSON.stringify({
      zh: getHomeContent("zh"),
      en: getHomeContent("en"),
      zhProjects: getProjects("zh"),
      enProjects: getProjects("en"),
    });
    for (const forbidden of ["色彩萌宠", "武汉科技大学", "account_id", "advertiser_id", "access_token"]) {
      expect(publicCopy).not.toContain(forbidden);
    }
  });
});
