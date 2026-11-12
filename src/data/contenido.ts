// Único fichero con textos personales. Todo lo que empieza por «TODO:» está pendiente de que Cristina
// lo escriba: no se inventa nada sobre ella. Al sustituir un marcador, la web lo muestra como texto normal.
import type { Contenido } from "../lib/tipos.ts";

export const contenido = {
  nombre: "Cristina Santos",
  titular: "Desarrolladora frontend",
  sobreMi: [
    "Soy desarrolladora y llevo más de cinco años trabajando en ello. Lo que más me gusta es el frontend, aunque de vez en cuando cambio al backend: me gusta entender cómo encaja todo.",
    "Trabajo con React, Next.js, Vue, Node, PHP, Bash y MySQL. En mis proyectos personales uso Python y ahora estoy aprendiendo Go. Disfruto aprendiendo lenguajes nuevos y trasteando con el código para comparar soluciones distintas."
  ],
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
    { etiqueta: "Correo", valor: "santosplazacristina@gmail.com", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "criisspl", prefijo: "https://github.com/" },
    { etiqueta: "LinkedIn", valor: "cristina-santos-plaza", prefijo: "https://www.linkedin.com/in/" }
  ]
} satisfies Contenido;
