import { expect, test } from "@playwright/test";

test("la CSP está en el build y la página funciona sin violaciones", async ({ page }) => {
  const errores: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errores.push(m.text());
  });
  page.on("pageerror", (e) => errores.push(e.message));
  await page.goto("./");
  await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute(
    "content",
    /default-src 'self'.*script-src 'self'/
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const fuente = await page.evaluate(() => document.fonts.check('700 16px "JetBrains Mono"'));
  expect(fuente).toBe(true);
  expect(errores).toEqual([]);
});
