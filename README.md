# Portfolio

[![CI](https://github.com/criisspl/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/criisspl/portfolio/actions/workflows/ci.yml)

Portfolio personal: una web estática en Svelte 5 con estética pixel tranquila (Calm Pixel), en inglés, publicada en GitHub Pages.

## Principios

- Estática y sin backend: todo se resuelve en el build.
- Sin CDNs, fuentes ni scripts de terceros: fuentes e imágenes son locales. El build añade una CSP en un `<meta>` (`default-src 'self'`).
- Móvil primero (390x844) y accesible.
- Los textos personales viven en un único fichero de datos.

## Stack

- Svelte 5, solo con runas (`$state`, `$derived`, `$props`), y componentes con `<script lang="ts">`.
- TypeScript estricto y Vite.
- Vitest (unitarios) y Playwright (e2e).
- Node 22 (ver `.nvmrc`; `package.json` exige `>=22`).

## Puesta en marcha

```sh
npm ci
npm run dev
```

## Scripts

| Script                         | Qué hace                                                           |
| ------------------------------ | ------------------------------------------------------------------ |
| `npm run dev`                  | Servidor de desarrollo de Vite.                                    |
| `npm run build`                | Compila a `dist/`, crea `dist/404.html` y prerenderiza la portada. |
| `npm run preview`              | Sirve `dist/` en el puerto 4173 (falla si está ocupado).           |
| `npm run lint`                 | ESLint sobre todo el repo.                                         |
| `npm run format`               | Prettier, escribe los cambios.                                     |
| `npm run format:check`         | Prettier, solo comprueba.                                          |
| `npm run typecheck`            | `svelte-check` con `--fail-on-warnings`.                           |
| `npm test`                     | Tests unitarios con Vitest.                                        |
| `npm run comprobar-marcadores` | Falla si quedan textos pendientes en `src/data/contenido.ts`.      |
| `npm run e2e`                  | Hace el build y ejecuta Playwright.                                |
| `npm run validate`             | Lint, formato, tipos, tests y e2e (con build). Es lo que corre CI. |

## Arquitectura

El flujo de dependencias es `data → lib → ui / ds`:

- `data` guarda el contenido.
- `lib` tiene la lógica pura y sus tipos, sin Svelte.
- `ui` son los componentes, que leen los datos y usan los tokens de `ds`.

```text
src/
  data/contenido.ts   # único fichero con textos personales
  lib/                # tipos, marcadores, pendientes, metadatos, ruta
  ui/                 # Seccion, Proyecto, Contactos, Texto, NoEncontrada
  ds/                 # estilos.css (tokens), fuentes.css, fuentes/ (woff2 y licencias OFL)
  App.svelte          # portada
  main.ts             # monta App o NoEncontrada según la ruta
scripts/              # comprobar-marcadores, copiar-404, prerenderizar
test/                 # Vitest
e2e/                  # Playwright
```

`vite.config.ts` incluye dos plugins: uno rellena título y descripción de `index.html` desde los datos, y otro añade la CSP en el build.

## Contenido y marcadores

Todos los textos personales están en `src/data/contenido.ts`. Un texto pendiente es un marcador: una cadena que empieza por `TODO` seguido de dos puntos. La web lo muestra resaltado con borde discontinuo (`Texto.svelte`) y los enlaces de contacto y de proyecto asociados no se generan hasta que se rellena.

Para rellenarlo, sustituye la cadena por el texto real. No hace falta tocar nada más.

`npm run comprobar-marcadores` lista los campos pendientes y termina con código 1 si hay alguno. Solo lee `src/data/contenido.ts`. CI lo ejecuta únicamente en `push` a `main`, después de `validate`: mientras haya marcadores, el job `validate` falla en `main` y `desplegar` no corre, así que no se publica un portfolio a medias. En las PR no se ejecuta.

## Sistema de diseño

Los tokens están en `src/ds/estilos.css`. Los componentes no usan medidas propias, solo estos tokens.

- Tipografía: Inter (cuerpo, 17px) y JetBrains Mono (títulos y menú). Tamaños: `--titulo-1/2/3`, `--texto-xs/sm/md/lg`.
- Espacio: base de 0.25rem (4px), `--espacio-N` con N en 1, 2, 3, 4, 5, 6, 7, 8, 12, 14 y 16.
- Borde: `--grosor-borde` 4px y `--grosor-fino` 2px. Sombra: `--sombra-pixel`.
- Toque mínimo: `--toque-min` 44px.
- Breakpoint único: 45rem (720px): una columna por debajo. Vive solo en `App.svelte` (las media queries no admiten `var()`).
- Fuentes locales en `src/ds/fuentes/` (woff2), con sus licencias OFL en `src/ds/fuentes/licencias/`.

## Accesibilidad

- Skip-link «Skip to content»: primer foco de la página; mueve el foco a `<main id="contenido" tabindex="-1">`.
- Decoraciones con `aria-hidden="true"` (por ejemplo, los iconos de los títulos y la flecha ↗ de los enlaces externos).
- Paleta oscura con colores definidos como tokens; `test/contraste.test.ts` comprueba que los pares de color de los tokens cumplen WCAG AA (4.5 texto, 3 bordes).
- `prefers-reduced-motion: reduce` desactiva el scroll suave, las transiciones y las animaciones.
- Foco visible con `:focus-visible` y dianas táctiles de al menos 44px en la navegación.

## Tests

- Unitarios (`test/`, Vitest): `npm test`.
- E2E (`e2e/`, Playwright) contra la web compilada, con dos proyectos: `movil` (390x844) y `escritorio` (1280x800). Los mismos tests corren en ambos.

```sh
npx playwright install chromium   # solo la primera vez
npm run e2e                       # build + Playwright
```

Playwright arranca `npm run preview` en `http://localhost:4173/portfolio/`. Fuera de CI reutiliza un servidor ya levantado en ese puerto; si el puerto está ocupado por otra cosa, libéralo antes.

## CI/CD

El workflow `.github/workflows/ci.yml` se ejecuta en `push` a `main`, en PR y a mano (`workflow_dispatch`). En PR se cancelan las ejecuciones antiguas.

- `validate`: `npm ci`, instala Chromium de Playwright, `npm run validate`. En `main` ejecuta además `comprobar-marcadores` y sube `dist/` como artefacto de Pages. Si falla, sube el informe de Playwright.
- `desplegar`: solo en `push` a `main` y tras `validate`; publica en GitHub Pages.

Notas de despliegue:

- `base: "/portfolio/"` en `vite.config.ts` es absoluta, para que los recursos también carguen desde `404.html` en rutas anidadas. Si cambia el nombre del repo o se añade dominio propio, hay que cambiarla.
- GitHub Pages sirve `404.html` (copia de `index.html`) en rutas desconocidas; `main.ts` detecta que no es la portada y monta `NoEncontrada`.
- GitHub Pages requiere repositorio público o un plan que lo permita para repositorios privados.

## Convenciones

- Una PR por cambio, desde una rama `feature/<nombre>`.
- Conventional Commits.
- Textos de la web en inglés; comentarios en español.
- No añadir dependencias sin consultarlo.
- Ejecutar `npm run validate` antes de dar algo por hecho.

## Pendiente

Capturas de pantalla y licencia del proyecto.
