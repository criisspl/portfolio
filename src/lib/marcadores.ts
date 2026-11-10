import type { Contacto } from "./tipos.ts";

const PREFIJO = "TODO";

/** Un marcador es un texto pendiente de rellenar por la persona dueña del portfolio. */
export function esMarcador(texto: string): boolean {
  return texto.trimStart().startsWith(PREFIJO);
}

/** Enlace de un contacto, o `null` si el valor aún es un marcador. */
export function hrefDeContacto(contacto: Contacto): string | null {
  return esMarcador(contacto.valor) ? null : `${contacto.prefijo}${contacto.valor}`;
}

/** Enlace público de un proyecto, o `null` si aún es un marcador. */
export function hrefPublico(enlace: string): string | null {
  return esMarcador(enlace) ? null : enlace;
}
