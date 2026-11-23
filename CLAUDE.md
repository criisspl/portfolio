# CLAUDE.md

Portfolio personal de Cristina. Web estática (GitHub Pages), sin backend. Cada línea está aquí porque sin ella Claude se equivocaría.

## Stack y comandos

- Svelte 5 solo con runas (`$state`, `$derived`, `$props`; nada de `export let`, `$:`, `<slot>`, `on:click`), componentes con `<script lang="ts">`. Vite, TypeScript estricto, Node 22.
- Imports con extensión explícita (`.ts`); `import type` para tipos (`verbatimModuleSyntax`).
- Tests: Vitest en `test/`. E2E: Playwright en `e2e/`, contra la web compilada, viewport móvil.

| Qué            | Comando                           |
| -------------- | --------------------------------- |
| Instalar       | `npm ci`                          |
| Dev            | `npm run dev`                     |
| Todo (como CI) | `npm run validate`                |
| Lint y formato | `npm run lint` · `npm run format` |

`validate` = lint + formato + tipos + tests + build + e2e. Tiene que pasar antes de dar algo por hecho.

## Reglas del proyecto

- Sin CDNs, fuentes ni scripts de terceros: todo local (fuentes en `src/ds/fuentes`).
- Móvil primero (390x844) y accesible (semántica, contraste, foco visible, `prefers-reduced-motion`).
- Textos personales solo en el fichero de datos; los que faltan son marcadores `TODO`. No inventar nada sobre Cristina.
- Una PR por cambio, rama `feature/<nombre>`, Conventional Commits.
- Textos de la web en inglés; comentarios en español.
- No añadas dependencias sin preguntar.
