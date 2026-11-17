import { describe, expect, it } from "vitest";
import css from "../src/ds/estilos.css?raw";

function color(token: string): string {
  const m = new RegExp(`--${token}:\\s*(#[0-9a-fA-F]{6})\\b`).exec(css);
  if (!m?.[1]) throw new Error(`Token --${token} no encontrado como #rrggbb`);
  return m[1];
}

function luminancia(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

// WCAG 2.x AA: 4.5 para texto normal, 3 para componentes gráficos (bordes).
const TEXTO: [string, string][] = [
  ["texto", "fondo"],
  ["texto", "panel"],
  ["suave", "fondo"],
  ["suave", "panel"],
  ["acento", "fondo"],
  ["acento", "panel"],
  ["aviso", "fondo"],
  ["aviso", "panel"],
  ["fondo", "acento"] // skip-link
];

describe("contraste WCAG AA de los tokens de color", () => {
  it.each(TEXTO)("texto --%s sobre --%s >= 4.5", (fg, bg) => {
    expect(contraste(color(fg), color(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(["fondo", "panel"])("borde --borde sobre --%s >= 3", (bg) => {
    expect(contraste(color("borde"), color(bg))).toBeGreaterThanOrEqual(3);
  });
});
