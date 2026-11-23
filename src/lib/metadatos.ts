import { esMarcador } from "./marcadores.ts";
import type { Contenido } from "./tipos.ts";

const TITULO_GENERICO = "Portfolio";
const DESCRIPCION_GENERICA = "Personal portfolio: about me, projects and contact.";

/** Título de la pestaña: el nombre real, o uno genérico mientras sea un marcador. */
export function tituloDe(contenido: Pick<Contenido, "nombre">): string {
  return esMarcador(contenido.nombre) ? TITULO_GENERICO : `${contenido.nombre} · Portfolio`;
}

/** Descripción para buscadores: el titular real, o una genérica mientras sea un marcador. */
export function descripcionDe(contenido: Pick<Contenido, "titular">): string {
  return esMarcador(contenido.titular) ? DESCRIPCION_GENERICA : contenido.titular;
}

/** Escapa un texto para usarlo dentro de un atributo o elemento HTML. */
export function escaparHtml(texto: string): string {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
