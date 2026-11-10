import { describe, expect, it } from "vitest";
import { contenido } from "../src/data/contenido.ts";

describe("contenido", () => {
  it("no repite tecnologías dentro de un proyecto", () => {
    for (const proyecto of contenido.proyectos) {
      expect(new Set(proyecto.tecnologias).size, proyecto.nombre).toBe(proyecto.tecnologias.length);
    }
  });

  it("no repite nombres de proyecto (clave del {#each})", () => {
    const nombres = contenido.proyectos.map((p) => p.nombre);
    expect(new Set(nombres).size).toBe(nombres.length);
  });

  it("no repite etiquetas de contacto (clave del {#each})", () => {
    const etiquetas = contenido.contactos.map((c) => c.etiqueta);
    expect(new Set(etiquetas).size).toBe(etiquetas.length);
  });
});
