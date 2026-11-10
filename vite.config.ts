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

// GitHub Pages no permite cabeceras: la CSP va en un meta, solo en el build (Vite en dev inyecta código en línea).
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'"
].join("; ");

function csp(): Plugin {
  return {
    name: "csp",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: () => [
        {
          tag: "meta",
          attrs: { "http-equiv": "Content-Security-Policy", content: CSP },
          injectTo: "head-prepend"
        }
      ]
    }
  };
}

export default defineConfig({
  // Absoluta: así los recursos también cargan desde 404.html en rutas anidadas.
  // Si cambia el nombre del repo o se añade un dominio propio, cambiar aquí.
  base: "/portfolio/",
  plugins: [svelte(), metadatos(), csp()],
  build: {
    target: ["es2020", "safari15", "chrome90", "firefox94", "edge90"]
  },
  test: {
    include: ["test/**/*.test.ts"]
  }
});
