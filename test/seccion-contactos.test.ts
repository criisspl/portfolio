import { describe, expect, it } from "vitest";
import { createRawSnippet } from "svelte";
import { render } from "svelte/server";
import Contactos from "../src/ui/Contactos.svelte";
import Seccion from "../src/ui/Seccion.svelte";
import type { Contacto } from "../src/lib/tipos.ts";

describe("Seccion.svelte", () => {
  const children = createRawSnippet(() => ({ render: () => "<p>cuerpo</p>" }));
  const { body } = render(Seccion, { props: { id: "demo", titulo: "Demo", icono: "persona", children } });

  it("el h2 lleva el icono oculto a lectores de pantalla y el título", () => {
    expect(body).toMatch(
      /<h2 id="t-demo"[^>]*><svg [^>]*aria-hidden="true"[^>]*>.*<\/svg>(?:<!---->)?Demo<\/h2>/s
    );
  });

  it("aria-labelledby apunta al id del h2 y se renderiza el contenido", () => {
    expect(body).toContain('id="demo"');
    expect(body).toContain('aria-labelledby="t-demo"');
    expect(body).toContain("<p>cuerpo</p>");
  });
});

describe("Contactos.svelte", () => {
  const contactos: Contacto[] = [
    { etiqueta: "Email", valor: "a@b.dev", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "TODO: usuario", prefijo: "https://github.com/" }
  ];

  it("enlaza el contacto real", () => {
    const { body } = render(Contactos, { props: { contactos } });
    expect(body).toContain('href="mailto:a@b.dev"');
    expect(body).toContain("Email");
  });

  it("marca el contacto pendiente sin enlazarlo", () => {
    const { body } = render(Contactos, { props: { contactos } });
    expect(body).toContain("data-marcador");
    expect(body).not.toContain("github.com");
  });
});
