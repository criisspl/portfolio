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

/** Enlace público de un proyecto, o `null` si es un marcador o no es una URL `https:` válida. */
export function hrefPublico(enlace: string): string | null {
  if (esMarcador(enlace)) return null;
  try {
    return new URL(enlace).protocol === "https:" ? enlace : null;
  } catch {
    return null;
  }
}
