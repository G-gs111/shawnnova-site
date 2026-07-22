import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ActiveNav, pickActiveSection } from "./active-nav";

const items = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#work" },
  { label: "联系", href: "#contact" },
];

afterEach(cleanup);

describe("ActiveNav", () => {
  it("keeps a usable navigation before observers run", () => {
    render(<ActiveNav items={items} />);

    expect(screen.getByRole("navigation", { name: "主要导航" })).toBeVisible();
    expect(screen.getByRole("link", { name: "关于" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "项目" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("selects the most visible known section", () => {
    expect(
      pickActiveSection(
        [
          { id: "about", isIntersecting: true, intersectionRatio: 0.18 },
          { id: "work", isIntersecting: true, intersectionRatio: 0.72 },
          { id: "unknown", isIntersecting: true, intersectionRatio: 0.98 },
        ],
        items,
      ),
    ).toBe("#work");
  });
});
