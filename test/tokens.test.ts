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

  it.each(["--pixel-s", "--pixel-m", "--pixel-l"])("%s es múltiplo de 8px (raíz de 16px)", (token) => {
    const rem = Number.parseFloat(valorDe(token) ?? "");
    expect(valorDe(token)).toMatch(/rem$/);
    expect((rem * 16) % 8).toBe(0);
  });
});
