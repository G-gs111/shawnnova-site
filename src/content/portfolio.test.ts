import { describe, expect, it } from "vitest";

import {
  getHomeContent,
  getProject,
  getProjects,
  projectSlugs,
  publicContact,
} from "./portfolio";

describe("portfolio content", () => {
  it("keeps four routable cases but only three homepage flagships", () => {
    expect(projectSlugs).toEqual([
      "content-compliance",
      "script-knowledge-workflow",
      "selection-dashboard",
      "qianchuan-cockpit",
    ]);
    expect(
      getProjects("zh")
        .filter((project) => project.featured)
        .map((project) => project.slug),
    ).toEqual([
      "content-compliance",
      "script-knowledge-workflow",
      "selection-dashboard",
    ]);
    expect(
      getProjects("zh")
        .filter((project) => !project.featured)
        .map((project) => project.slug),
    ).toEqual(["qianchuan-cockpit"]);
  });

  it("publishes the verified adoption evidence", () => {
    expect(getHomeContent("zh").metrics.map((item) => item.value)).toEqual([
      "112",
      "1,356",
      "89/100",
      "10",
      "1/67",
    ]);
    expect(getProject("zh", "content-compliance")?.results.map((item) => item.value)).toEqual([
      "112",
      "1,356",
      "52% → 24%",
    ]);
    expect(getProject("zh", "script-knowledge-workflow")?.results.map((item) => item.value)).toEqual([
      "89/100",
      "60min → 10min",
      "200+ / 近 300",
    ]);
    expect(getProject("zh", "selection-dashboard")?.results.map((item) => item.value)).toEqual([
      "10",
      "27/30",
      "60min → 15min",
    ]);
    expect(getProject("zh", "qianchuan-cockpit")?.results.map((item) => item.value)).toEqual([
      "4",
      "D-1",
      "171",
    ]);
  });

  it("keeps quantitative results and evidence keys aligned across locales", () => {
    for (const slug of projectSlugs) {
      const zh = getProject("zh", slug);
      const en = getProject("en", slug);
      expect(zh).toBeDefined();
      expect(en).toBeDefined();
      expect(zh?.results.map((item) => item.key ?? item.value)).toEqual(
        en?.results.map((item) => item.key ?? item.value),
      );
      expect(Object.keys(zh?.evidence ?? {})).toEqual(["problem", "built", "adopted", "proof"]);
      expect(Object.keys(en?.evidence ?? {})).toEqual(["problem", "built", "adopted", "proof"]);
    }
  });

  it("states causal and human-decision boundaries honestly", () => {
    const compliance = getProject("zh", "content-compliance");
    const selection = getProject("zh", "selection-dashboard");
    const qianchuan = getProject("zh", "qianchuan-cockpit");

    expect(compliance?.boundary).toContain("两个独立的 50 条样本");
    expect(compliance?.boundary).toContain("不能单独证明因果");
    expect(selection?.boundary).toContain("最终决策仍由选品负责人完成");
    expect(qianchuan?.status).toContain("验收中");
    expect(qianchuan?.boundary).toContain("部分 WorkBuddy 控制能力仍在验收");
  });

  it("keeps public contact and the new positioning fixed", () => {
    expect(publicContact).toMatchObject({
      email: "shawnnovags111@gmail.com",
      phone: "18379582410",
    });
    expect(getHomeContent("zh").hero.title).toBe("业务问题，不止分析；我把它交付成系统。");
    expect(getHomeContent("en").hero.title).toBe(
      "I turn frontline business problems into systems teams adopt.",
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

  it("does not expose commercial identities or private account fields", () => {
    const publicCopy = JSON.stringify({
      zh: getHomeContent("zh"),
      en: getHomeContent("en"),
      zhProjects: getProjects("zh"),
      enProjects: getProjects("en"),
    });
    for (const forbidden of [
      "色彩萌宠",
      "account_id",
      "advertiser_id",
      "access_token",
      "QQ 邮箱",
    ]) {
      expect(publicCopy).not.toContain(forbidden);
    }
  });
});
