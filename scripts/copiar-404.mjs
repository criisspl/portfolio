// GitHub Pages sirve 404.html en rutas desconocidas: reutilizamos index.html.
import { copyFile } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");
console.log("dist/404.html creado a partir de dist/index.html");
