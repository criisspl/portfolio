// Único fichero con textos personales. Todo lo que empieza por «TODO:» está pendiente de que Cristina
// lo escriba: no se inventa nada sobre ella. Al sustituir un marcador, la web lo muestra como texto normal.
import type { Contenido } from "../lib/tipos.ts";

export const contenido = {
  nombre: "Cristina Santos",
  titular: "Desarrolladora frontend",
  sobreMi: [
    "Hi! I'm a developer with 5+ years of work behind me. Frontend is my happy place, but every now and then I sneak over to the backend just to see how the other half lives.",
    "My day-to-day is React, Next.js, Vue, Node, PHP, Bash and MySQL. On side projects I play with Python, and I'm currently learning Go. I love picking up new languages and tinkering with code to see how many different ways there are to solve the same problem."
  ],
  proyectos: [
    {
      nombre: "Showroom",
      descripcion:
        "App web que descubre tu paleta de color, tu tipo de cuerpo y tu estética, guarda tu ropa y monta outfits según la ocasión y el tiempo. Los datos viven solo en el dispositivo; la IA es opcional y pide permiso.",
      tecnologias: ["Svelte 5", "TypeScript", "Vite", "IndexedDB", "Cloudflare Workers"],
      enlace: "TODO: enlace público a Showroom (el repositorio es privado)"
    },
    {
      nombre: "commitcat",
      descripcion:
        "CLI en Go que lee el diff staged y propone un mensaje en formato Conventional Commits. Usa un modelo local con Ollama por defecto, así el código no sale de tu máquina; Claude es opcional con API key.",
      tecnologias: ["Go", "Cobra", "Ollama", "Claude API", "GitHub Actions"],
      enlace: "https://github.com/criisspl/commitcat"
    },
    {
      nombre: "pixelalt",
      descripcion:
        "CLI en Python que descarga las imágenes de una URL, audita su accesibilidad (sin alt, alt vacío indebido, alt genérico) y genera texto alt con un modelo de visión local vía Ollama. Claude es opcional.",
      tecnologias: ["Python", "Typer", "httpx", "BeautifulSoup", "Ollama"],
      enlace: "https://github.com/criisspl/pixelalt"
    }
  ],
  contactos: [
    { etiqueta: "Correo", valor: "santosplazacristina@gmail.com", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "criisspl", prefijo: "https://github.com/" },
    { etiqueta: "LinkedIn", valor: "cristina-santos-plaza", prefijo: "https://www.linkedin.com/in/" }
  ]
} satisfies Contenido;
