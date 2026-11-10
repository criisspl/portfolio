import { describe, expect, it } from "vitest";
import { contenido } from "../src/data/contenido.ts";
import { esMarcador, hrefDeContacto, hrefPublico } from "../src/lib/marcadores.ts";

describe("marcadores", () => {
  it("detecta textos pendientes", () => {
    expect(esMarcador("TODO: tu nombre")).toBe(true);
    expect(esMarcador("  TODO: algo")).toBe(true);
    expect(esMarcador("Showroom")).toBe(false);
  });

  it("no genera enlace mientras el contacto es un marcador", () => {
    expect(hrefDeContacto({ etiqueta: "Correo", valor: "TODO: correo", prefijo: "mailto:" })).toBeNull();
  });

  it("genera el enlace cuando el contacto es real", () => {
    expect(hrefDeContacto({ etiqueta: "Correo", valor: "a@b.es", prefijo: "mailto:" })).toBe("mailto:a@b.es");
  });

  it("solo enlaza proyectos con URL real", () => {
    expect(hrefPublico("TODO: enlace")).toBeNull();
    expect(hrefPublico("https://ejemplo.dev")).toBe("https://ejemplo.dev");
  });
});

describe("contenido", () => {
  it("Showroom es el primer proyecto", () => {
    expect(contenido.proyectos[0]?.nombre).toBe("Showroom");
  });

  it("los datos personales siguen siendo marcadores TODO hasta que Cristina los escriba", () => {
    const personales = [contenido.nombre, contenido.titular, ...contenido.sobreMi];
    expect(personales.every(esMarcador)).toBe(true);
    expect(contenido.contactos.length).toBeGreaterThan(0);
  });

  it("no hay claves de proyecto ni de contacto repetidas", () => {
    const nombres = contenido.proyectos.map((p) => p.nombre);
    const etiquetas = contenido.contactos.map((c) => c.etiqueta);
    expect(new Set(nombres).size).toBe(nombres.length);
    expect(new Set(etiquetas).size).toBe(etiquetas.length);
  });
});
