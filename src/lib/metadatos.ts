import { esMarcador } from "./marcadores.ts";
import type { Contenido } from "./tipos.ts";

const TITULO_GENERICO = "Portfolio";
const DESCRIPCION_GENERICA = "Portfolio personal: sobre mí, proyectos y contacto.";

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
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
