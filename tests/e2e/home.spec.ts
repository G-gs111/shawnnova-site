import { expect, test } from "@playwright/test";

test("presents Shawnnova's identity, work and contact path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "把复杂技术，做成愿意被使用的产品。" }),
  ).toBeVisible();
  await expect(page.getByText("葛少玉", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Shawnnova", { exact: true }).last()).toBeVisible();
  await expect(page.locator("#work")).toContainText("AI 视频工具");
  await expect(page.locator("#experience")).toContainText("运营");
  await expect(page.locator("#experience")).toContainText("销售");
  await expect(page.locator("#experience")).toContainText("产品开发");
  await expect(page.locator("#experience")).toContainText("Vibe Coding");
  await expect(page.locator("#approach")).toContainText("理解");
  await expect(page.locator(".motto-band")).toContainText("功不唐捐，玉汝于成");

  await expect(
    page.locator("#contact").getByRole("link", { name: /shawnnovags111@gmail.com/i }),
  ).toHaveAttribute("href", "mailto:shawnnovags111@gmail.com");
  await expect(page.getByRole("link", { name: /18379582410/i })).toHaveAttribute(
    "href",
    "tel:18379582410",
  );

  const githubLink = page.getByRole("link", { name: /GitHub/i }).last();
  await expect(githubLink).toHaveAttribute("href", "https://github.com/G-gs111");
});

test("uses an asymmetric experience rail and a two-column contact layout on desktop", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome");
  await page.goto("/");

  await expect(page.locator(".experience-section")).toHaveCSS("display", "grid");
  await expect(page.locator(".contact-layout")).toHaveCSS("display", "grid");

  const contactColumns = await page.locator(".contact-layout").evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
  );
  expect(contactColumns).toHaveLength(2);
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

test("keeps the page within the mobile viewport", async ({ page }) => {
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator("#contact")).toBeVisible();
});

test("keeps portfolio content visible when reduced motion is enabled", async ({ page }) => {
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("hydrated")) {
      hydrationErrors.push(message.text());
    }
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  for (const card of await page.locator("#work article").all()) {
    await expect(card).toBeVisible();
  }
  for (const item of await page.locator("#approach article").all()) {
    await expect(item).toBeVisible();
  }
  expect(hydrationErrors).toEqual([]);
});
