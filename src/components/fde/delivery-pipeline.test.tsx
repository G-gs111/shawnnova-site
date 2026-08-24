import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getHomeContent } from "@/content/portfolio";

import { DeliveryPipeline } from "./delivery-pipeline";

afterEach(cleanup);

describe("DeliveryPipeline", () => {
  it("renders every stage and exposes its active purpose", () => {
    const groups = getHomeContent("zh").systems.groups;
    render(<DeliveryPipeline groups={groups} locale="zh" />);

    for (const group of groups) {
      expect(screen.getByRole("button", { name: group.stage })).toBeInTheDocument();
    }

    const ai = screen.getByRole("button", { name: "AI 判断" });
    fireEvent.click(ai);
    expect(ai).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(groups[2].purpose)).toBeInTheDocument();
    expect(screen.getByText("DeepSeek")).toBeInTheDocument();
    expect(screen.getByText("Codex")).toBeInTheDocument();
  });
});
