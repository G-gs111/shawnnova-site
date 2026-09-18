import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getHomeContent } from "@/content/portfolio";

import { DeliveryConsole } from "./delivery-console";

afterEach(cleanup);

describe("DeliveryConsole", () => {
  it("shows every delivery stage and changes the current step by click", () => {
    const stages = getHomeContent("zh").delivery.stages;
    render(<DeliveryConsole stages={stages} locale="zh" />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("button", { name: /进入业务/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByText("把判断做成系统")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: /推动上线/ }));
    expect(screen.getByRole("button", { name: /推动上线/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByText("部署、异常处理与人工兜底")).toBeVisible();
  });

  it("uses an English accessible region label", () => {
    render(<DeliveryConsole stages={getHomeContent("en").delivery.stages} locale="en" />);

    expect(screen.getByRole("region", { name: "Delivery console" })).toBeInTheDocument();
  });
});
