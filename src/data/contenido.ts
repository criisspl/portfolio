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
      enlace: "https://github.com/criisspl/showroom"
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
    },
    {
      nombre: "claude-config",
      descripcion:
        "Plugin de Claude Code con 16 hooks que frenan force push, push a main, rm -rf peligrosos y secretos en el código, probados en CI contra 309 casos de red-team. Reparte cada tarea entre Opus, Sonnet y Haiku para gastar menos tokens.",
      tecnologias: ["Shell", "JavaScript", "Python", "GitHub Actions"],
      enlace: "https://github.com/criisspl/claude-config"
    },
    {
      nombre: "Buscador de ofertas",
      descripcion:
        "Subes tu CV en PDF, cuentas qué buscas y la IA puntúa de 0 a 100 las ofertas de trabajo según cómo encajan contigo. Los datos viven solo en el navegador; usa la IA de la app o la tuya, incluido Ollama en local.",
      tecnologias: ["Next.js", "TypeScript", "Dexie", "Upstash", "Groq", "Ollama"],
      enlace: "https://github.com/criisspl/buscador-ofertas"
    }
  ],
  contactos: [
    { etiqueta: "Correo", valor: "santosplazacristina@gmail.com", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "criisspl", prefijo: "https://github.com/" },
    { etiqueta: "LinkedIn", valor: "cristina-santos-plaza", prefijo: "https://www.linkedin.com/in/" }
  ]
} satisfies Contenido;
