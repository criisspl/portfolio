import { describe, expect, it, vi } from "vitest";
import { render } from "svelte/server";
import Proyecto from "../src/ui/Proyecto.svelte";

vi.mock("../src/data/contenido.ts", () => ({
  contenido: {
    nombre: "Ana",
    titular: "Dev",
    sobreMi: ["Repetido", "Repetido"],
    proyectos: [],
    contactos: []
  }
}));

describe("claves de {#each} con duplicados", () => {
  it("Proyecto renderiza tecnologías repetidas sin lanzar", () => {
    const proyecto = {
      nombre: "P",
      descripcion: "D",
      tecnologias: ["a", "a"],
      enlace: "https://ejemplo.dev"
    };
    const { body } = render(Proyecto, { props: { proyecto } });
    expect(body.match(/<li[^>]*>a<\/li>/g)).toHaveLength(2);
  });

  it("App renderiza párrafos de sobreMi repetidos sin lanzar", async () => {
    const { default: App } = await import("../src/App.svelte");
    const { body } = render(App);
    expect(body.match(/Repetido/g)).toHaveLength(2);
  });
});
