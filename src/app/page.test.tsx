import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the complete personal portfolio structure", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "把复杂技术，做成愿意被使用的产品。",
      }),
    ).toBeInTheDocument();
    expect(document.querySelector("#about")).toBeInTheDocument();
    expect(document.querySelector("#work")).toBeInTheDocument();
    expect(document.querySelector("#approach")).toBeInTheDocument();
    expect(document.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByText("AI 视频工具")).toBeInTheDocument();
    expect(screen.getByText("桌面端体验")).toBeInTheDocument();
    expect(screen.getByText("持续实验")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "GitHub" })
        .some(
          (link) =>
            link.classList.contains("contact-link") &&
            link.getAttribute("href") === "https://github.com/G-gs111",
        ),
    ).toBe(true);
  });
});
