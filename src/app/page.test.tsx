import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import HomePage from "./page";

afterEach(cleanup);

describe("HomePage", () => {
  it("renders the mature portfolio story in a clear order", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "从业务现场，到可用产品。",
      }),
    ).toBeInTheDocument();

    for (const id of [
      "about",
      "capability",
      "work",
      "experience",
      "collaboration",
      "contact",
    ]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("presents truthful evidence and project states", () => {
    render(<HomePage />);

    for (const value of ["1/67", "100+", "6000+", "200%+"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
    expect(screen.getByText("宠物达人内容运营工作台")).toBeInTheDocument();
    expect(screen.getByText("某宠物内容电商机构")).toBeInTheDocument();
    expect(screen.getAllByText("已上线")).toHaveLength(2);
    expect(screen.getByText("开发中")).toBeInTheDocument();
    expect(screen.getByText("探索中")).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("色彩萌宠");
  });

  it("keeps education compact and collaboration paths concrete", () => {
    render(<HomePage />);

    expect(screen.getByText("店铺运营与增长")).toBeInTheDocument();
    expect(screen.getByText("业务产品构建")).toBeInTheDocument();
    expect(screen.getByText("武汉科技大学 物流管理 本科")).toBeInTheDocument();
    expect(screen.getByText("AI 产品与产品运营")).toBeInTheDocument();
    expect(screen.getByText("个人站与轻量 Web 产品")).toBeInTheDocument();
    expect(screen.getByText("内容工具与业务工作流")).toBeInTheDocument();
  });

  it("preserves tools and direct contact routes", () => {
    render(<HomePage />);

    const tools = screen.getByRole("region", { name: "常用工具" });
    for (const label of [
      "Codex",
      "飞书",
      "GitHub",
      "VS Code",
      "Cloudflare",
      "Vercel",
    ]) {
      expect(tools).toHaveTextContent(label);
    }
    expect(
      screen
        .getAllByRole("link", { name: /shawnnovags111@gmail.com/i })
        .every(
          (link) =>
            link.getAttribute("href") === "mailto:shawnnovags111@gmail.com",
        ),
    ).toBe(true);
    expect(screen.getByRole("link", { name: /18379582410/ })).toHaveAttribute(
      "href",
      "tel:18379582410",
    );
  });
});
