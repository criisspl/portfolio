<script lang="ts">
  import { contenido } from "./data/contenido.ts";
  import Contactos from "./ui/Contactos.svelte";
  import Proyecto from "./ui/Proyecto.svelte";
  import Seccion from "./ui/Seccion.svelte";
  import Texto from "./ui/Texto.svelte";

  const sobreMi = { id: "about", nombre: "About me" };
  const proyectos = { id: "projects", nombre: "Projects" };
  const contacto = { id: "contact", nombre: "Contact" };
  const secciones = [sobreMi, proyectos, contacto];
</script>

<a class="saltar" href="#contenido">Skip to content</a>

<div class="envoltura">
  <header class="lateral">
    <p class="marca"><span aria-hidden="true">&gt;&nbsp;</span>cristina</p>
    <nav aria-label="Main">
      <ul>
        {#each secciones as seccion (seccion.id)}
          <li><a href={`#${seccion.id}`}>{seccion.nombre}</a></li>
        {/each}
      </ul>
    </nav>
  </header>

  <main id="contenido" tabindex="-1">
    <section class="portada" aria-labelledby="titulo">
      <h1 id="titulo"><Texto texto={contenido.nombre} /></h1>
      <p class="titular"><Texto texto={contenido.titular} /></p>
    </section>

    <Seccion id={sobreMi.id} titulo={sobreMi.nombre} icono="persona">
      <!-- Clave por índice: lista estática y dos párrafos iguales harían fallar `each_key_duplicate`. -->
      {#each contenido.sobreMi as parrafo, i (i)}
        <p><Texto texto={parrafo} /></p>
      {/each}
    </Seccion>

    <Seccion id={proyectos.id} titulo={proyectos.nombre} icono="carpeta">
      <div class="proyectos">
        {#each contenido.proyectos as proyecto (proyecto.nombre)}
          <Proyecto {proyecto} />
        {/each}
      </div>
    </Seccion>

    <Seccion id={contacto.id} titulo={contacto.nombre} icono="sobre" separada>
      <Contactos contactos={contenido.contactos} />
    </Seccion>
  </main>

  <footer>
    <p>Built with Svelte 5 · no trackers, no third-party resources</p>
  </footer>
</div>

<style>
  .saltar {
    position: absolute;
    left: var(--espacio-2);
    top: calc(var(--espacio-16) * -1);
    background: var(--acento);
    color: var(--fondo);
    font-weight: 600;
    padding: var(--espacio-3) var(--espacio-4);
    z-index: 10;
  }
  .saltar:focus {
    top: var(--espacio-2);
  }
  /* main solo recibe foco por script (skip-link): no es interactivo, no necesita contorno. */
  main:focus-visible {
    outline: none;
  }
  .envoltura {
    display: grid;
    gap: 0 var(--espacio-12);
    grid-template-columns: var(--ancho-lateral) minmax(0, 1fr);
    margin: 0 auto;
    max-width: var(--ancho-max);
    padding: 0 var(--espacio-6);
  }
  .lateral {
    align-self: start;
    padding: var(--espacio-12) 0;
    position: sticky;
    top: 0;
  }
  .marca {
    color: var(--acento);
    font: 700 var(--texto-sm) / 1.4 var(--mono);
    margin: 0 0 var(--espacio-6);
  }
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav a {
    align-items: center;
    border-left: var(--grosor-borde) solid transparent;
    color: var(--texto);
    display: flex;
    font: 500 var(--texto-sm) var(--mono);
    min-height: var(--toque-min);
    padding-left: var(--espacio-3);
    text-decoration: none;
  }
  nav a:hover {
    border-left-color: var(--borde);
    color: var(--acento);
  }
  main {
    min-width: 0;
    padding: var(--espacio-12) 0 var(--espacio-16);
  }
  .portada {
    padding-bottom: var(--espacio-14);
  }
  h1 {
    color: var(--texto);
    font-size: var(--titulo-1);
    margin-bottom: var(--espacio-2);
    overflow-wrap: anywhere;
  }
  .titular {
    color: var(--suave);
    font-size: var(--texto-lg);
    margin: 0;
  }
  p {
    max-width: var(--ancho-lectura);
  }
  .proyectos {
    display: grid;
    gap: var(--espacio-8);
  }
  footer {
    color: var(--suave);
    font-size: var(--texto-sm);
    grid-column: 2;
    padding-bottom: var(--espacio-12);
  }
  footer p {
    margin: 0;
  }
  /* El breakpoint (45rem = 720px) no admite var() en media queries. */
  @media (max-width: 45rem) {
    .envoltura {
      grid-template-columns: 1fr;
    }
    .lateral {
      padding: var(--espacio-4) 0;
      position: static;
    }
    nav ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0 var(--espacio-4);
    }
    main {
      padding-top: var(--espacio-6);
    }
    footer {
      grid-column: 1;
    }
  }
</style>
