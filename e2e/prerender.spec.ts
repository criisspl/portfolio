import { expect, test } from "@playwright/test";

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("la portada se ve prerenderizada", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toBeVisible();
  });
});

test("el montado sobre el prerender no produce avisos y respeta el ancla", async ({ page }) => {
  const avisos: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") avisos.push(m.text());
  });
  page.on("pageerror", (e) => avisos.push(e.message));
  await page.goto("./#contact");
  await expect(page.getByRole("heading", { level: 2, name: "Contact" })).toBeInViewport();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  expect(avisos).toEqual([]);
});

test("el 404 no se prerenderiza como portada", async ({ page }) => {
  await page.goto("x/y");
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toHaveCount(0);
});
