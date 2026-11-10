// Prerenderiza la portada en dist/index.html con el render de servidor de Svelte: sin JS la página
// se ve igual y el cliente la hidrata. No toca dist/404.html (se copia antes, con el contenedor vacío).
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const VACIO = '<div id="app"></div>';
const servidor = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "error"
});

try {
  // `render` se carga con el mismo servidor que App: dos copias de Svelte (una en dev y otra en node) fallan.
  const { render } = await servidor.ssrLoadModule("svelte/server");
  const { default: App } = await servidor.ssrLoadModule("/src/App.svelte");
  const { body } = render(App);
  const html = await readFile("dist/index.html", "utf8");
  if (!html.includes(VACIO)) throw new Error(`dist/index.html no contiene ${VACIO}`);
  await writeFile("dist/index.html", html.replace(VACIO, `<div id="app">${body}</div>`));
  console.log("dist/index.html prerenderizado");
} finally {
  await servidor.close();
}
