import { describe, expect, it } from "vitest";

import { getRevealInitial } from "./reveal";

describe("getRevealInitial", () => {
  it("never hides content before the reveal runs", () => {
    expect(getRevealInitial()).toMatchObject({ opacity: 1 });
  });

  it("starts regular reveals below their final position", () => {
    expect(getRevealInitial()).toEqual({ opacity: 1, y: 20 });
  });
});
