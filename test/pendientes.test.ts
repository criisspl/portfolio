import { describe, expect, it } from "vitest";
import { listarPendientes } from "../src/lib/pendientes.ts";
import type { Contenido } from "../src/lib/tipos.ts";

const proyecto = { nombre: "P", descripcion: "D", tecnologias: ["Svelte"], enlace: "https://ejemplo.dev" };
const contacto = { etiqueta: "Correo", valor: "a@b.es", prefijo: "mailto:" };

const relleno: Contenido = {
  nombre: "Ana",
  titular: "Desarrolladora",
  sobreMi: ["Uno", "Dos"],
  proyectos: [proyecto],
  contactos: [contacto]
};

describe("listarPendientes", () => {
  it("devuelve una lista vacía si todo está relleno", () => {
    expect(listarPendientes(relleno)).toEqual([]);
  });

  it("devuelve la ruta de cada campo pendiente", () => {
    const contenido: Contenido = {
      ...relleno,
      nombre: "TODO: nombre",
      sobreMi: ["Uno", "TODO: dos"],
      proyectos: [{ ...proyecto, enlace: "TODO: enlace", tecnologias: ["Svelte", "TODO: otra"] }],
      contactos: [contacto, { etiqueta: "GitHub", valor: "TODO: usuario", prefijo: "https://github.com/" }]
    };
    expect(listarPendientes(contenido)).toEqual([
      "nombre",
      "sobreMi[1]",
      "proyectos[0].enlace",
      "proyectos[0].tecnologias[1]",
      "contactos[1].valor"
    ]);
  });
});
