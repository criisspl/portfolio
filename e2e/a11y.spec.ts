import { expect, test } from "@playwright/test";

test.describe("accesibilidad", () => {
  test("el enlace para saltar al contenido es el primer foco, se ve y lleva a #contenido", async ({
    page
  }) => {
    await page.goto("./");
    await page.keyboard.press("Tab");
    const saltar = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(saltar).toBeFocused();
    await expect(saltar).toBeInViewport({ ratio: 1 });
    const caja = await saltar.boundingBox();
    expect(caja?.width).toBeGreaterThan(0);
    expect(caja?.height).toBeGreaterThan(0);

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#contenido$/);
    await expect(page.locator("#contenido")).toBeInViewport();
    // <main tabindex="-1"> recibe el foco: el siguiente Tab sigue desde el contenido, no desde la cabecera.
    const activo = await page.evaluate(() => {
      const el = document.activeElement;
      return `${el?.tagName.toLowerCase()}#${el?.id}`;
    });
    expect(activo).toBe("main#contenido");
    await expect(
      page.getByRole("navigation", { name: "Principal" }).getByRole("link").first()
    ).not.toBeFocused();
  });

  test("con prefers-reduced-motion: reduce no hay scroll suave, transiciones ni animaciones", async ({
    page
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    const scroll = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    expect(scroll).toBe("auto");
    const activos = await page.evaluate(() =>
      [...document.querySelectorAll("*")]
        .filter((el) => {
          const c = getComputedStyle(el);
          const dura = (v: string) => v.split(",").some((d) => parseFloat(d) > 0);
          return dura(c.transitionDuration) || dura(c.animationDuration) || c.animationName !== "none";
        })
        .map((el) => el.tagName.toLowerCase())
    );
    expect(activos).toEqual([]);
  });
});
