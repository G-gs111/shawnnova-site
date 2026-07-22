import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { HeroMask, resolveMaskPoint } from "./hero-mask";

afterEach(cleanup);

describe("HeroMask", () => {
  it("renders readable base content and a hidden visual duplicate", () => {
    render(
      <HeroMask image="/images/shawnnova-hero-studio-v2.webp">
        <h1>从业务现场，到可用产品。</h1>
      </HeroMask>,
    );

    expect(
      screen.getByRole("heading", { name: "从业务现场，到可用产品。" }),
    ).toBeVisible();
    expect(screen.getByTestId("hero-mask-overlay")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("keeps the mask centered when motion is reduced or input is touch", () => {
    expect(resolveMaskPoint({ x: 120, y: 80 }, true, "mouse")).toEqual({
      x: 50,
      y: 50,
    });
    expect(resolveMaskPoint({ x: 120, y: 80 }, false, "touch")).toEqual({
      x: 50,
      y: 50,
    });
    expect(resolveMaskPoint({ x: 72, y: 34 }, false, "mouse")).toEqual({
      x: 72,
      y: 34,
    });
  });
});
