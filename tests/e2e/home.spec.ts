import { expect, test } from "@playwright/test";

test("presents Shawnnova's identity, work and contact path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "把复杂技术，做成愿意被使用的产品。" }),
  ).toBeVisible();
  await expect(page.getByText("葛少玉", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Shawnnova", { exact: true }).last()).toBeVisible();
  await expect(page.locator("#work")).toContainText("AI 视频工具");
  await expect(page.locator("#approach")).toContainText("理解");

  const githubLink = page.getByRole("link", { name: /GitHub/i }).last();
  await expect(githubLink).toHaveAttribute("href", "https://github.com/G-gs111");
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
