import { describe, expect, it } from "vitest";

import { siteContent } from "./site";

describe("siteContent", () => {
  it("describes Shawnnova with honest portfolio content", () => {
    expect(siteContent.identity.name).toBe("葛少玉");
    expect(siteContent.identity.alias).toBe("Shawnnova");
    expect(siteContent.work).toHaveLength(3);
    expect(siteContent.contact.href).toBe("https://github.com/G-gs111");
  });
});
