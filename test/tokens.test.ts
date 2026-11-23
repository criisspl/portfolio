import { describe, expect, it } from "vitest";
import css from "../src/ds/estilos.css?raw";

const valorDe = (token: string): string | undefined =>
  new RegExp(`${token}:\\s*([^;]+);`).exec(css)?.[1]?.trim();

describe("tokens del sistema de diseño", () => {
  it.each(["--ancho-max", "--espacio-1", "--grosor-borde", "--sombra-pixel", "--toque-min"])(
    "define %s",
    (token) => {
      expect(valorDe(token)).toBeDefined();
    }
  );

  it.each(["--titulo-1", "--titulo-2", "--titulo-3", "--texto-md"])("%s está en rem", (token) => {
    expect(valorDe(token)).toMatch(/^[\d.]+rem$/);
  });
});
