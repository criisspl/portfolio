import { expect, test } from "@playwright/test";

test.describe("página inicial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("tiene las tres secciones con su encabezado", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const nombre of ["Sobre mí", "Proyectos", "Contacto"]) {
      await expect(page.getByRole("heading", { level: 2, name: nombre })).toBeVisible();
    }
  });

  test("Showroom es el primer proyecto", async ({ page }) => {
    const proyectos = page.getByRole("article");
    await expect(proyectos.first().getByRole("heading", { name: "Showroom" })).toBeVisible();
  });

  test("la navegación lleva a cada sección", async ({ page }) => {
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Contacto" }).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.getByRole("heading", { level: 2, name: "Contacto" })).toBeInViewport();
  });

  test("los textos pendientes se ven como marcadores", async ({ page }) => {
    await expect(page.locator("[data-marcador]").first()).toBeVisible();
  });

  test("el enlace para saltar al contenido recibe el foco primero", async ({ page }) => {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
  });

  test("no hay desbordamiento horizontal en móvil", async ({ page }) => {
    const desborda = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(desborda).toBe(false);
  });

  test("no carga recursos de otros orígenes", async ({ page }) => {
    const externos: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith("http://localhost:4173")) externos.push(r.url());
    });
    await page.reload();
    expect(externos).toEqual([]);
  });
});
