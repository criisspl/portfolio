import { describe, expect, it } from "vitest";
import { render } from "svelte/server";
import NoEncontrada from "../src/ui/NoEncontrada.svelte";
import Proyecto from "../src/ui/Proyecto.svelte";
import type { Proyecto as DatosProyecto } from "../src/lib/tipos.ts";

const proyecto: DatosProyecto = {
  nombre: "Demo",
  descripcion: "Una demo",
  tecnologias: ["Svelte", "TypeScript"],
  enlace: "https://ejemplo.dev"
};

describe("Proyecto.svelte", () => {
  it("muestra nombre, descripción y tecnologías", () => {
    const { body } = render(Proyecto, { props: { proyecto } });
    expect(body).toContain("Demo");
    expect(body).toContain("Una demo");
    expect(body).toContain("<li");
    expect(body).toContain("TypeScript");
  });

  it("enlaza solo cuando hay una URL https real", () => {
    expect(render(Proyecto, { props: { proyecto } }).body).toContain('href="https://ejemplo.dev"');
    const pendiente = render(Proyecto, { props: { proyecto: { ...proyecto, enlace: "TODO: enlace" } } }).body;
    expect(pendiente).not.toContain("<a ");
    expect(pendiente).toContain("data-marcador");
  });

  it("no enlaza un javascript:", () => {
    const { body } = render(Proyecto, {
      props: { proyecto: { ...proyecto, enlace: "javascript:alert(1)" } }
    });
    expect(body).not.toContain("href=");
  });

  it("escapa HTML del contenido", () => {
    const { body } = render(Proyecto, { props: { proyecto: { ...proyecto, descripcion: "<img src=x>" } } });
    expect(body).not.toContain("<img");
  });
});

describe("NoEncontrada.svelte", () => {
  it("tiene un h1 y enlaza a inicio", () => {
    const { body } = render(NoEncontrada, { props: { inicio: "/portfolio/" } });
    expect(body).toContain("<h1");
    expect(body).toContain('href="/portfolio/"');
  });
});
