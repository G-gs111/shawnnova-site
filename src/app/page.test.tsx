import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "./page";

vi.mock("@/components/fde/network-canvas", () => ({
  NetworkCanvas: ({ label }: { label: string }) => <figure aria-label={label} />,
}));

vi.mock("@/components/contact-form", () => ({
  ContactForm: () => <form aria-label="联系表单" />,
}));

afterEach(cleanup);

describe("HomePage", () => {
  it("states the FDE positioning without interaction", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "把一线业务问题，做成能跑的系统。",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("FDE 方向", { exact: false })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看案例" })).toHaveAttribute("href", "#work");
  });

  it("keeps old anchors and renders the three public cases", () => {
    render(<HomePage />);

    for (const id of ["about", "metrics", "approach", "work", "experience", "tools", "contact"]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }
    for (const title of ["内容合规检测助手", "商品决策与自动选品看板", "多品牌千川数据驾驶舱"]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it("shows the verified headline metrics and direct contact routes", () => {
    render(<HomePage />);

    const metrics = screen.getByRole("region", { name: "成果概览" });
    for (const value of ["6", "1,000+", "210", "5"]) {
      expect(within(metrics).getByText(value)).toBeInTheDocument();
    }
    expect(within(metrics).queryByText("4")).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "项目证据台" })).toBeInTheDocument();
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

  it("does not expose education, awards, company or deprecated client wording", () => {
    render(<HomePage />);
    const copy = document.body.textContent ?? "";

    for (const forbidden of ["武汉科技大学", "专业排名", "竞赛奖项", "色彩萌宠", "某宠物内容电商机构", "QQ 邮箱"]) {
      expect(copy).not.toContain(forbidden);
    }
  });
});
