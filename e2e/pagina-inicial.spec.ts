import { expect, test } from "@playwright/test";

test.describe("página inicial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("tiene las tres secciones con su encabezado", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const nombre of ["About me", "Projects", "Contact"]) {
      await expect(page.getByRole("heading", { level: 2, name: nombre, exact: true })).toBeVisible();
    }
  });

  test("esqueleto de la página (sin depender de los datos personales)", async ({ page }) => {
    await expect(page.locator("body")).toMatchAriaSnapshot(`
      - link "Skip to content"
      - banner:
        - navigation "Main":
          - list:
            - listitem:
              - link "About me"
            - listitem:
              - link "Projects"
            - listitem:
              - link "Contact"
      - main:
        - region /.+/:
          - heading /.+/ [level=1]
          - paragraph
        - region "About me":
          - heading "About me" [level=2]
          - paragraph
        - region "Projects":
          - heading "Projects" [level=2]
          - article:
            - heading "Showroom" [level=3]
            - paragraph
            - list "Technologies"
            - paragraph
        - region "Contact":
          - heading "Contact" [level=2]
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
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole("heading", { level: 2, name: "Contact", exact: true })).toBeInViewport();
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
