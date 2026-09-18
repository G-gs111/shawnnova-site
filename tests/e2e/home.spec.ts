import { expect, test } from "@playwright/test";

test("presents recruiter evidence and all four case routes", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "业务问题，不止分析；我把它交付成系统。" }),
  ).toBeVisible();
  await expect(page.getByRole("region", { name: "交付控制台" })).toBeVisible();
  await expect(page.getByRole("region", { name: "成果证据" })).toContainText("1,356");
  await expect(page.locator(".fde-case-evidence-row")).toHaveCount(3);
  await expect(page.locator(".fde-supporting-system")).toContainText("4");
  await expect(
    page.getByRole("link", { name: /脚本知识库与 AI 生成工作流/ }),
  ).toHaveAttribute("href", "/projects/script-knowledge-workflow");
  await expect(page.locator("#experience")).toContainText("武汉科技大学");
  await expect(page.locator("#experience")).toContainText("1/67");
});

test("keeps the evidence table and contact band structured on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome");
  await page.goto("/");

  await expect(page.locator(".fde-case-evidence-row").first()).toHaveCSS("display", "grid");
  await expect(page.locator(".fde-contact")).toHaveCSS("display", "grid");
  await expect(page.locator(".fde-contact-panel")).toBeVisible();

  const evidenceColumns = await page.locator(".fde-case-evidence-row dl").first().evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
  );
  expect(evidenceColumns).toHaveLength(4);
});

test("submits a visitor contact after Turnstile verification", async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.addInitScript(() => {
    window.turnstile = {
      render: (_element, options) => {
        queueMicrotask(() => options.callback("playwright-turnstile-token"));
        return "playwright-widget";
      },
      remove: () => undefined,
      reset: () => undefined,
    };
  });
  await page.route("https://contact-api.260604.xyz/", async (route) => {
    const body = route.request().postDataJSON();
    expect(body).toMatchObject({
      name: "林澈",
      contact: "lin@example.com",
      consent: true,
      turnstileToken: "playwright-turnstile-token",
    });
    await route.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true}' });
  });

  await page.goto("/");
  await page.getByLabel("怎么称呼你").fill("林澈");
  await page.getByLabel("你的联系方式").fill("lin@example.com");
  await page.getByLabel("想聊些什么").fill("想聊一个新产品的合作机会。");
  await page.getByLabel("我同意将以上信息用于本次联系。").check();
  await page.getByRole("button", { name: /留下联系方式/ }).click();

  await expect(page.getByRole("status")).toContainText(
    "收到，我会通过你留下的方式联系你。",
  );
});

test("keeps the page within a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator(".fde-case-evidence-row")).toHaveCount(3);
  await expect(page.locator("#contact")).toBeVisible();
});

test("keeps portfolio content visible when reduced motion is enabled", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  for (const row of await page.locator(".fde-case-evidence-row").all()) {
    await expect(row).toBeVisible();
  }
  for (const step of await page.locator("#method li").all()) {
    await expect(step).toBeVisible();
  }
  expect(consoleErrors).toEqual([]);
});
