// Único fichero con textos personales. Todo lo que empieza por «TODO:» está pendiente de que Cristina
// lo escriba: no se inventa nada sobre ella. Al sustituir un marcador, la web lo muestra como texto normal.
import type { Contenido } from "../lib/tipos.ts";

export const contenido = {
  nombre: "Cristina Santos",
  titular: "Frontend developer",
  sobreMi: [
    "Hi! I'm a developer with 5+ years of work behind me. Frontend is my happy place, but every now and then I sneak over to the backend just to see how the other half lives.",
    "My day-to-day is React, Next.js, Vue, Node, PHP, Bash and MySQL. On side projects I play with Python, and I'm currently learning Go. I love picking up new languages and tinkering with code to see how many different ways there are to solve the same problem."
  ],
  proyectos: [
    {
      nombre: "Showroom",
      descripcion:
        "Web app that finds your color palette, body type and style, stores your clothes and builds outfits for the occasion and the weather. Data stays on your device; AI is optional and asks permission.",
      tecnologias: ["Svelte 5", "TypeScript", "Vite", "IndexedDB", "Cloudflare Workers"],
      enlace: "https://github.com/criisspl/showroom"
    },
    {
      nombre: "commitcat",
      descripcion:
        "Go CLI that reads your staged diff and suggests a Conventional Commits message. Uses a local Ollama model by default, so your code never leaves your machine; Claude is optional with an API key.",
      tecnologias: ["Go", "Cobra", "Ollama", "Claude API", "GitHub Actions"],
      enlace: "https://github.com/criisspl/commitcat"
    },
    {
      nombre: "pixelalt",
      descripcion:
        "Python CLI that downloads a URL's images, audits their accessibility (missing alt, wrongly empty alt, generic alt) and writes alt text with a local vision model via Ollama. Claude is optional.",
      tecnologias: ["Python", "Typer", "httpx", "BeautifulSoup", "Ollama"],
      enlace: "https://github.com/criisspl/pixelalt"
    },
    {
      nombre: "claude-config",
      descripcion:
        "Claude Code plugin with 16 hooks that block force pushes, pushes to main, dangerous rm -rf and secrets in code, tested in CI against 309 red-team cases. Splits each task across Opus, Sonnet and Haiku to spend fewer tokens.",
      tecnologias: ["Shell", "JavaScript", "Python", "GitHub Actions"],
      enlace: "https://github.com/criisspl/claude-config"
    },
    {
      nombre: "Job offer finder",
      descripcion:
        "Upload your CV as a PDF, say what you're looking for, and AI scores job offers from 0 to 100 by how well they fit you. Data stays in your browser; use the app's AI or your own, including local Ollama.",
      tecnologias: ["Next.js", "TypeScript", "Dexie", "Upstash", "Groq", "Ollama"],
      enlace: "https://github.com/criisspl/buscador-ofertas"
    },
    {
      nombre: "Finance tracker",
      descripcion:
        "Personal finance web app that compares your monthly income and spending against 6 money rules. Your data is encrypted in the browser with a password only you know: the server stores a block nobody else can read.",
      tecnologias: ["React 19", "TypeScript", "Vite", "Supabase", "Web Crypto", "Vitest"],
      enlace: "https://github.com/criisspl/gestor-finanzas"
    }
  ],
  contactos: [
    { etiqueta: "Email", valor: "santosplazacristina@gmail.com", prefijo: "mailto:" },
    { etiqueta: "GitHub", valor: "criisspl", prefijo: "https://github.com/" },
    { etiqueta: "LinkedIn", valor: "cristina-santos-plaza", prefijo: "https://www.linkedin.com/in/" }
  ]
} satisfies Contenido;
