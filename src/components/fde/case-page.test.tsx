import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getProject } from "@/content/portfolio";

import { CasePage } from "./case-page";

afterEach(cleanup);

describe("CasePage", () => {
  it("puts verified results and delivery status before the workflow", () => {
    const project = getProject("zh", "content-compliance")!;
    const { container } = render(<CasePage locale="zh" project={project} />);

    expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
    expect(screen.getByText("已上线并持续使用")).toBeInTheDocument();
    for (const value of ["112", "1,356", "52% → 24%"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "证据边界" })).toBeInTheDocument();
    expect(screen.getByText(/两个独立的 50 条样本/)).toBeInTheDocument();

    const results = container.querySelector(".fde-case-results");
    const flow = container.querySelector(".fde-case-flow");
    expect(results).not.toBeNull();
    expect(flow).not.toBeNull();
    expect(results?.compareDocumentPosition(flow as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.getByRole("link", { name: /脚本知识库与 AI 生成工作流/ })).toHaveAttribute(
      "href",
      "/projects/script-knowledge-workflow",
    );
  });

  it("keeps the equivalent English case route in the language switch", () => {
    render(<CasePage locale="zh" project={getProject("zh", "selection-dashboard")!} />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute(
      "href",
      "/en/projects/selection-dashboard",
    );
  });

  it("cycles through the supporting case and back to the first case", () => {
    const { unmount } = render(
      <CasePage locale="en" project={getProject("en", "selection-dashboard")!} />,
    );
    expect(screen.getByRole("link", { name: /Qianchuan data cockpit/i })).toHaveAttribute(
      "href",
      "/en/projects/qianchuan-cockpit",
    );
    unmount();

    render(<CasePage locale="en" project={getProject("en", "qianchuan-cockpit")!} />);
    expect(screen.getByRole("link", { name: /Script risk self-check/i })).toHaveAttribute(
      "href",
      "/en/projects/content-compliance",
    );
  });
});
