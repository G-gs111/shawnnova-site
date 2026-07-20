import { describe, expect, it } from "vitest";

import { getRevealInitial } from "./reveal";

describe("getRevealInitial", () => {
  it("does not hide content when reduced motion is requested", () => {
    expect(getRevealInitial(true)).toBe(false);
  });

  it("starts regular reveals below their final position", () => {
    expect(getRevealInitial(false)).toEqual({ opacity: 0, y: 20 });
  });
});
