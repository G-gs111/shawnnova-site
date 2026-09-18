import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/content/portfolio";

import { CaseEvidenceList } from "./case-evidence-list";

afterEach(cleanup);

describe("CaseEvidenceList", () => {
  it("renders three featured cases with the four-part evidence contract", () => {
    render(
      <CaseEvidenceList
        projects={getFeaturedProjects("zh")}
        locale="zh"
        routePrefix=""
        viewCaseLabel="查看完整案例"
      />,
    );

    const rows = screen.getAllByRole("article");
    expect(rows).toHaveLength(3);
    for (const row of rows) {
      for (const label of ["问题", "构建", "采用", "证据"]) {
        expect(within(row).getByText(label)).toBeInTheDocument();
      }
    }
    expect(screen.getByRole("link", { name: /创作者脚本风险自检 H5/ })).toHaveAttribute(
      "href",
      "/projects/content-compliance",
    );
    expect(screen.queryByText("多品牌千川数据驾驶舱")).not.toBeInTheDocument();
  });

  it("builds localized English project routes", () => {
    render(
      <CaseEvidenceList
        projects={getFeaturedProjects("en")}
        locale="en"
        routePrefix="/en"
        viewCaseLabel="View full case"
      />,
    );

    expect(
      screen.getByRole("link", { name: /Script Knowledge Base & AI Generation Workflow/ }),
    ).toHaveAttribute("href", "/en/projects/script-knowledge-workflow");
  });
});
