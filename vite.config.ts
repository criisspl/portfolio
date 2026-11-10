import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  // Rutas relativas: funciona en la raíz y en un subdirectorio de GitHub Pages.
  base: "./",
  plugins: [svelte()],
  build: {
    target: ["es2020", "safari15", "chrome90", "firefox94", "edge90"]
  },
  test: {
    include: ["test/**/*.test.ts"]
  }
});
