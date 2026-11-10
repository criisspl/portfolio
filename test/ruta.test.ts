import { describe, expect, it } from "vitest";
import { esPortada } from "../src/lib/ruta.ts";

describe("esPortada", () => {
  it("reconoce la base y su index.html", () => {
    expect(esPortada("/portfolio/", "/portfolio/")).toBe(true);
    expect(esPortada("/portfolio/index.html", "/portfolio/")).toBe(true);
  });

  it("rechaza cualquier otra ruta", () => {
    expect(esPortada("/portfolio/a/b", "/portfolio/")).toBe(false);
    expect(esPortada("/otra", "/portfolio/")).toBe(false);
  });
});
