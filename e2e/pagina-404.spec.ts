import { expect, test } from "@playwright/test";

test("una ruta anidada desconocida muestra el 404 y carga sus recursos", async ({ page }) => {
  const fallidas: string[] = [];
  page.on("requestfailed", (r) => fallidas.push(r.url()));
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().endsWith("/favicon.ico")) fallidas.push(`${r.status()} ${r.url()}`);
  });
  await page.goto("a/b");
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/portfolio/");
  await expect(page).toHaveTitle("Page not found");
  expect(fallidas.filter((f) => !f.startsWith("404 http://localhost:4173/portfolio/a/b"))).toEqual([]);
});
