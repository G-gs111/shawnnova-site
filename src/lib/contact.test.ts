import { describe, expect, it } from "vitest";

import { validateContact, type ContactValues } from "./contact";

const validValues: ContactValues = {
  name: "林先生",
  contact: "lin@example.com",
  message: "想聊一个产品合作。",
  consent: true,
  website: "",
  turnstileToken: "verified-token",
};

describe("validateContact", () => {
  it("requires a name, contact route and consent", () => {
    expect(
      validateContact({
        ...validValues,
        name: "",
        contact: "",
        consent: false,
      }),
    ).toEqual({
      name: "请告诉我怎么称呼你。",
      contact: "请至少留下一种联系方式。",
      consent: "提交前请确认联系授权。",
    });
  });

  it("enforces the public field limits", () => {
    expect(
      validateContact({
        ...validValues,
        name: "名".repeat(61),
        contact: "x".repeat(121),
        message: "内".repeat(1001),
      }),
    ).toEqual({
      name: "称呼请控制在 60 个字符以内。",
      contact: "联系方式请控制在 120 个字符以内。",
      message: "留言请控制在 1000 个字符以内。",
    });
  });

  it("accepts a minimal valid contact request", () => {
    expect(
      validateContact({
        ...validValues,
        message: "",
      }),
    ).toEqual({});
  });
});
