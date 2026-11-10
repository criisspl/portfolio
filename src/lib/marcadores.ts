import type { Contacto } from "./tipos.ts";

const PATRON = /^\s*TODO:/;

/** Un marcador es un texto pendiente de rellenar: empieza (tras espacios) por `TODO:` en mayúsculas. */
export function esMarcador(texto: string): boolean {
  return PATRON.test(texto);
}

/** Enlace de un contacto, o `null` si el valor aún es un marcador. */
export function hrefDeContacto(contacto: Contacto): string | null {
  return esMarcador(contacto.valor) ? null : `${contacto.prefijo}${contacto.valor}`;
}

/** Enlace público de un proyecto, o `null` si aún es un marcador. */
export function hrefPublico(enlace: string): string | null {
  return esMarcador(enlace) ? null : enlace;
}
