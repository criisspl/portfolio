/** `true` si la ruta es la portada (la base del sitio, con o sin `index.html`). */
export function esPortada(ruta: string, base: string): boolean {
  return ruta === base || ruta === `${base}index.html`;
}
