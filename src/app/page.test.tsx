import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "./page";

vi.mock("@/components/contact-form", () => ({
  ContactForm: () => <form aria-label="联系表单" />,
}));

afterEach(cleanup);

describe("HomePage", () => {
  it("states the FDE delivery positioning without interaction", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "业务问题，不止分析；我把它交付成系统。",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("FDE / AI 应用交付", { exact: false }).length).toBeGreaterThan(0);
    expect(screen.getByRole("region", { name: "交付控制台" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看案例" })).toHaveAttribute("href", "#work");
  });

  it("keeps old anchors and separates three flagship cases from the supporting system", () => {
    render(<HomePage />);

    for (const id of ["about", "metrics", "proof", "approach", "work", "experience", "tools", "contact"]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }
    for (const title of [
      "创作者脚本风险自检 H5",
      "脚本知识库与 AI 生成工作流",
      "宠物品类选品监测与辅助决策",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("article").filter((node) => node.classList.contains("fde-case-evidence-row"))).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 3, name: "多品牌千川数据驾驶舱" })).toBeInTheDocument();
  });

  it("shows verified evidence, profile credibility and direct contact routes", () => {
    render(<HomePage />);

    const metrics = screen.getByRole("region", { name: "成果证据" });
    for (const value of ["112", "1,356", "89/100", "10", "1/67"]) {
      expect(within(metrics).getByText(value)).toBeInTheDocument();
    }
    expect(screen.getByText("武汉科技大学", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("2027 届", { exact: true })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "交付链路" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shawnnovags111@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:shawnnovags111@gmail.com",
    );
    expect(screen.getByRole("link", { name: /18379582410/ })).toHaveAttribute(
      "href",
      "tel:18379582410",
    );
  });

  it("does not expose commercial identities or the private notification mailbox", () => {
    render(<HomePage />);
    const copy = document.body.textContent ?? "";

    for (const forbidden of ["色彩萌宠", "某宠物内容电商机构", "QQ 邮箱", "2797375316"] ) {
      expect(copy).not.toContain(forbidden);
    }
  });
});
