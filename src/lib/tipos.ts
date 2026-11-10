export interface Proyecto {
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  /** Enlace público; marcador TODO si aún no hay uno. */
  enlace: string;
}

export interface Contacto {
  etiqueta: string;
  /** Texto visible (correo, usuario…); marcador TODO si falta. */
  valor: string;
  /** Prefijo del enlace (`mailto:`, `https://github.com/`…). */
  prefijo: string;
}

export interface Contenido {
  nombre: string;
  titular: string;
  sobreMi: string[];
  proyectos: Proyecto[];
  contactos: Contacto[];
}
