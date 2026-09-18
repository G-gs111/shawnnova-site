import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getProjects } from "@/content/portfolio";

import { ProjectSignalStack } from "./project-signal-stack";

afterEach(cleanup);

describe("ProjectSignalStack", () => {
  it("keeps every case linked and changes the active diagnostic panel", () => {
    const projects = getProjects("zh");
    render(
      <ProjectSignalStack
        projects={projects}
        locale="zh"
        viewCaseLabel="查看完整案例"
        diagramLabel="系统流程示意"
        routePrefix=""
      />,
    );

    for (const project of projects) {
      expect(screen.getByRole("link", { name: `查看${project.title}` })).toHaveAttribute(
        "href",
        `/projects/${project.slug}`,
      );
    }

    const selection = screen.getByRole("button", { name: /宠物品类选品监测与辅助决策/ });
    fireEvent.click(selection);
    expect(selection).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: "宠物品类选品监测与辅助决策诊断" })).toBeInTheDocument();
    expect(screen.getByText("10", { selector: "dd" })).toBeInTheDocument();
  });
});
