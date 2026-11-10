import { defineConfig, type Plugin } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { contenido } from "./src/data/contenido.ts";
import { descripcionDe, escaparHtml, tituloDe } from "./src/lib/metadatos.ts";

// Título y descripción salen del fichero de datos: los textos viven solo allí.
function metadatos(): Plugin {
  return {
    name: "metadatos",
    transformIndexHtml(html) {
      return html
        .replace(/__TITULO__/g, escaparHtml(tituloDe(contenido)))
        .replace(/__DESCRIPCION__/g, escaparHtml(descripcionDe(contenido)));
    }
  };
}

export default defineConfig({
  // Absoluta: así los recursos también cargan desde 404.html en rutas anidadas.
  // Si cambia el nombre del repo o se añade un dominio propio, cambiar aquí.
  base: "/portfolio/",
  plugins: [svelte(), metadatos()],
  build: {
    target: ["es2020", "safari15", "chrome90", "firefox94", "edge90"]
  },
  test: {
    include: ["test/**/*.test.ts"]
  }
});
