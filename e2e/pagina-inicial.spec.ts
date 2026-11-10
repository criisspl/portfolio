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

  test("no carga recursos de otros orígenes", async ({ page }) => {
    const externos: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith("http://localhost:4173")) externos.push(r.url());
    });
    await page.reload();
    expect(externos).toEqual([]);
  });
});
