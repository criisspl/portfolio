import { mount } from "svelte";
import "./ds/estilos.css";
import App from "./App.svelte";
import { esPortada } from "./lib/ruta.ts";
import NoEncontrada from "./ui/NoEncontrada.svelte";

const base = import.meta.env.BASE_URL;
const destino = document.getElementById("app");
if (!destino) throw new Error("Falta el elemento #app en index.html");

// GitHub Pages sirve 404.html (copia de index.html) en rutas desconocidas.
if (esPortada(location.pathname, base)) {
  mount(App, { target: destino });
} else {
  document.title = "Página no encontrada";
  mount(NoEncontrada, { target: destino, props: { inicio: base } });
}
