import { esMarcador } from "./marcadores.ts";
import type { Contenido } from "./tipos.ts";

/** Rutas legibles (`proyectos[0].enlace`…) de los campos de texto que siguen siendo marcadores. */
export function listarPendientes(contenido: Contenido): string[] {
  const pendientes: string[] = [];
  const revisar = (ruta: string, texto: string): void => {
    if (esMarcador(texto)) pendientes.push(ruta);
  };

  revisar("nombre", contenido.nombre);
  revisar("titular", contenido.titular);
  contenido.sobreMi.forEach((parrafo, i) => revisar(`sobreMi[${i}]`, parrafo));
  contenido.proyectos.forEach((proyecto, i) => {
    revisar(`proyectos[${i}].nombre`, proyecto.nombre);
    revisar(`proyectos[${i}].descripcion`, proyecto.descripcion);
    revisar(`proyectos[${i}].enlace`, proyecto.enlace);
    proyecto.tecnologias.forEach((tecnologia, j) => revisar(`proyectos[${i}].tecnologias[${j}]`, tecnologia));
  });
  contenido.contactos.forEach((contacto, i) => {
    revisar(`contactos[${i}].etiqueta`, contacto.etiqueta);
    revisar(`contactos[${i}].valor`, contacto.valor);
  });

  return pendientes;
}
