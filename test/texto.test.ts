import { describe, expect, it } from "vitest";
import { render } from "svelte/server";
import Texto from "../src/ui/Texto.svelte";

describe("Texto.svelte", () => {
  it("marca el texto pendiente con data-marcador", () => {
    expect(render(Texto, { props: { texto: "TODO: x" } }).body).toContain("data-marcador");
  });

  it("no marca el texto real", () => {
    const { body } = render(Texto, { props: { texto: "Hola" } });
    expect(body).toContain("Hola");
    expect(body).not.toContain("data-marcador");
  });
});
