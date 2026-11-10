import { expect, test } from "@playwright/test";

test.describe("layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("la navegación cabe en una sola fila", async ({ page }) => {
    const enlaces = page.getByRole("navigation", { name: "Principal" }).getByRole("link");
    const tops = await enlaces.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top))
    );
    expect(new Set(tops).size).toBe(1);
  });

  test("no hay desbordamiento horizontal", async ({ page }) => {
    const desborda = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(desborda).toBe(false);
  });
});
