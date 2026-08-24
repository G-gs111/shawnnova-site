import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { NetworkCanvas } from "./network-canvas";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("NetworkCanvas", () => {
  it("provides a real pause and resume control", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    render(<NetworkCanvas label="系统中继" locale="zh" />);

    const pause = screen.getByRole("button", { name: "暂停数据流" });
    fireEvent.click(pause);
    expect(screen.getByRole("button", { name: "继续数据流" })).toBeInTheDocument();
  });
});
