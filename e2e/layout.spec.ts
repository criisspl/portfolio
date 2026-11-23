import { expect, test } from "@playwright/test";

test.describe("layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("la navegación cabe en una fila en móvil y es una columna en escritorio", async ({ page }, info) => {
    const enlaces = page.getByRole("navigation", { name: "Main" }).getByRole("link");
    const tops = await enlaces.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top))
    );
    expect(new Set(tops).size).toBe(info.project.name === "movil" ? 1 : tops.length);
  });

  test("no hay desbordamiento horizontal", async ({ page }) => {
    const desborda = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(desborda).toBe(false);
  });
});
