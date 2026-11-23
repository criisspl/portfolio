import { describe, expect, it } from "vitest";
import { descripcionDe, escaparHtml, tituloDe } from "../src/lib/metadatos.ts";

describe("metadatos", () => {
  it("usa títulos y descripciones genéricos mientras haya marcadores", () => {
    expect(tituloDe({ nombre: "TODO: tu nombre" })).toBe("Portfolio");
    expect(descripcionDe({ titular: "TODO: titular" })).toContain("Personal portfolio");
  });

  it("usa los textos reales cuando existen", () => {
    expect(tituloDe({ nombre: "Ana" })).toBe("Ana · Portfolio");
    expect(descripcionDe({ titular: "Desarrolla webs" })).toBe("Desarrolla webs");
  });

  it("escapa HTML", () => {
    expect(escaparHtml(`a"<b>&`)).toBe("a&quot;&lt;b&gt;&amp;");
  });
});
