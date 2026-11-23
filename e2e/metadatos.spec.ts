import { expect, test } from "@playwright/test";

test("el head tiene metadatos, favicon local y sin errores 404", async ({ page }) => {
  const fallidas: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) fallidas.push(`${r.status()} ${r.url()}`);
  });
  await page.goto("./");
  await expect(page).toHaveTitle(/Portfolio/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#14102b");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/portfolio/favicon.svg");
  await page.waitForLoadState("networkidle");
  expect(fallidas).toEqual([]);
});
