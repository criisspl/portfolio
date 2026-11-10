import { expect, test } from "@playwright/test";

test.describe("página inicial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("tiene las tres secciones con su encabezado", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const nombre of ["Sobre mí", "Proyectos", "Contacto"]) {
      await expect(page.getByRole("heading", { level: 2, name: nombre, exact: true })).toBeVisible();
    }
  });

  test("esqueleto de la página (sin depender de los datos personales)", async ({ page }) => {
    await expect(page.locator("body")).toMatchAriaSnapshot(`
      - link "Saltar al contenido"
      - banner:
        - navigation "Principal":
          - list:
            - listitem:
              - link "Sobre mí"
            - listitem:
              - link "Proyectos"
            - listitem:
              - link "Contacto"
      - main:
        - region /.+/:
          - heading /.+/ [level=1]
          - paragraph
        - region "Sobre mí":
          - heading "Sobre mí" [level=2]
          - paragraph
        - region "Proyectos":
          - heading "Proyectos" [level=2]
          - article:
            - heading "Showroom" [level=3]
            - paragraph
            - list "Tecnologías"
            - paragraph
        - region "Contacto":
          - heading "Contacto" [level=2]
          - list:
            - listitem: /.+/
      - contentinfo
    `);
  });

  test("Showroom es el primer proyecto", async ({ page }) => {
    const proyectos = page.getByRole("article");
    await expect(proyectos.first().getByRole("heading", { name: "Showroom" })).toBeVisible();
  });

  test("la navegación lleva a cada sección", async ({ page }) => {
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Contacto" }).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.getByRole("heading", { level: 2, name: "Contacto", exact: true })).toBeInViewport();
  });

  test("la navegación cabe en una sola fila en móvil", async ({ page }) => {
    const enlaces = page.getByRole("navigation", { name: "Principal" }).getByRole("link");
    const tops = await enlaces.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top))
    );
    expect(new Set(tops).size).toBe(1);
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
