import { describe, expect, it } from "vitest";
import { listarPendientes } from "../src/lib/pendientes.ts";
import type { Contenido } from "../src/lib/tipos.ts";

const relleno: Contenido = {
  nombre: "Ana",
  titular: "Desarrolladora",
  sobreMi: ["Uno", "Dos"],
  proyectos: [{ nombre: "P", descripcion: "D", tecnologias: ["Svelte"], enlace: "https://ejemplo.dev" }],
  contactos: [{ etiqueta: "Correo", valor: "a@b.es", prefijo: "mailto:" }]
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
      proyectos: [
        { ...relleno.proyectos[0]!, enlace: "TODO: enlace", tecnologias: ["Svelte", "TODO: otra"] }
      ],
      contactos: [
        relleno.contactos[0]!,
        { etiqueta: "GitHub", valor: "TODO: usuario", prefijo: "https://github.com/" }
      ]
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
