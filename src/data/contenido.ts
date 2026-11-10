// Único fichero con textos personales. Todo lo que empieza por «TODO» está pendiente de que Cristina
// lo escriba: no se inventa nada sobre ella. Al sustituir un marcador, la web lo muestra como texto normal.
import type { Contenido } from "../lib/tipos.ts";

export const contenido = {
  nombre: "TODO: tu nombre",
  titular: "TODO: tu titular (una frase sobre lo que haces)",
  sobreMi: ["TODO: primer párrafo sobre ti", "TODO: segundo párrafo (trayectoria, intereses…)"],
  proyectos: [
    {
      nombre: "Showroom",
      descripcion:
        "App web que descubre tu paleta de color, tu tipo de cuerpo y tu estética, guarda tu ropa y monta outfits según la ocasión y el tiempo. Los datos viven solo en el dispositivo; la IA es opcional y pide permiso.",
      tecnologias: ["Svelte 5", "TypeScript", "Vite", "IndexedDB", "Cloudflare Workers"],
      enlace: "TODO: enlace público a Showroom (el repositorio es privado)"
    }
  ],
  contactos: [
    { etiqueta: "Correo", valor: "TODO: tu correo", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "TODO: tu usuario de GitHub", prefijo: "https://github.com/" },
    { etiqueta: "LinkedIn", valor: "TODO: tu perfil de LinkedIn", prefijo: "https://www.linkedin.com/in/" }
  ]
} satisfies Contenido;
