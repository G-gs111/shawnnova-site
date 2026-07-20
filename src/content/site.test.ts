import { describe, expect, it } from "vitest";

import { siteContent } from "./site";

describe("siteContent", () => {
  it("describes Shawnnova with honest portfolio content", () => {
    expect(siteContent.identity.name).toBe("葛少玉");
    expect(siteContent.identity.alias).toBe("Shawnnova");
    expect(siteContent.identity.motto).toBe("功不唐捐，玉汝于成");
    expect(siteContent.experience.map((item) => item.title)).toEqual([
      "运营",
      "销售",
      "产品开发",
      "Vibe Coding",
    ]);
    expect(siteContent.work).toHaveLength(3);
    expect(siteContent.contact.email).toBe("shawnnovags111@gmail.com");
    expect(siteContent.contact.phone).toBe("18379582410");
    expect(siteContent.contact.github).toBe("https://github.com/G-gs111");
  });
});
