import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  // Absoluta: así los recursos también cargan desde 404.html en rutas anidadas.
  // Si cambia el nombre del repo o se añade un dominio propio, cambiar aquí.
  base: "/portfolio/",
  plugins: [svelte()],
  build: {
    target: ["es2020", "safari15", "chrome90", "firefox94", "edge90"]
  },
  test: {
    include: ["test/**/*.test.ts"]
  }
});
