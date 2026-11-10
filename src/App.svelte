<script lang="ts">
  import "./ds/estilos.css";
  import { contenido } from "./data/contenido.ts";
  import { hrefDeContacto } from "./lib/marcadores.ts";
  import Proyecto from "./ui/Proyecto.svelte";
  import Texto from "./ui/Texto.svelte";

  const secciones = [
    { id: "sobre-mi", nombre: "Sobre mí" },
    { id: "proyectos", nombre: "Proyectos" },
    { id: "contacto", nombre: "Contacto" }
  ];
</script>

<a class="saltar" href="#contenido">Saltar al contenido</a>

<header class="cabecera">
  <nav aria-label="Principal">
    <ul>
      {#each secciones as seccion (seccion.id)}
        <li><a href={`#${seccion.id}`}>{seccion.nombre}</a></li>
      {/each}
    </ul>
  </nav>
</header>

<main id="contenido">
  <section class="portada" aria-labelledby="titulo">
    <h1 id="titulo"><Texto texto={contenido.nombre} /></h1>
    <p class="titular"><Texto texto={contenido.titular} /></p>
  </section>

  <section id="sobre-mi" aria-labelledby="t-sobre-mi">
    <h2 id="t-sobre-mi">Sobre mí</h2>
    {#each contenido.sobreMi as parrafo (parrafo)}
      <p><Texto texto={parrafo} /></p>
    {/each}
  </section>

  <section id="proyectos" aria-labelledby="t-proyectos">
    <h2 id="t-proyectos">Proyectos</h2>
    <div class="proyectos">
      {#each contenido.proyectos as proyecto (proyecto.nombre)}
        <Proyecto {proyecto} />
      {/each}
    </div>
  </section>

  <section id="contacto" aria-labelledby="t-contacto">
    <h2 id="t-contacto">Contacto</h2>
    <ul class="contactos">
      {#each contenido.contactos as contacto (contacto.etiqueta)}
        {@const href = hrefDeContacto(contacto)}
        <li>
          <span class="etiqueta">{contacto.etiqueta}:</span>
          {#if href}
            <a {href}>{contacto.valor}</a>
          {:else}
            <Texto texto={contacto.valor} />
          {/if}
        </li>
      {/each}
    </ul>
  </section>
</main>

<footer>
  <p>Hecho con Svelte 5 · sin rastreadores ni recursos de terceros</p>
</footer>

<style>
  .saltar {
    position: absolute;
    left: 0.5rem;
    top: -4rem;
    background: var(--acento);
    color: var(--fondo);
    padding: 0.75rem 1rem;
    z-index: 10;
  }
  .saltar:focus {
    top: 0.5rem;
  }
  .cabecera {
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--fondo);
    border-bottom: 4px solid var(--borde);
  }
  nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 0 0.25rem;
    list-style: none;
    margin: 0 auto;
    max-width: 48rem;
    padding: 0.25rem 0.5rem;
  }
  nav a {
    display: inline-block;
    font-family: var(--pixel);
    font-size: 0.75rem;
    min-height: 44px;
    line-height: 44px;
    padding: 0 0.25rem;
    text-decoration: none;
  }
  nav a:hover {
    text-decoration: underline;
  }
  main {
    margin: 0 auto;
    max-width: 48rem;
    padding: 0 1rem;
  }
  section {
    padding: 2rem 0;
  }
  .portada {
    padding-top: 3rem;
  }
  h1 {
    color: var(--acento);
    font-size: 1.25rem;
    overflow-wrap: anywhere;
  }
  h2 {
    font-size: 1rem;
  }
  h2::before {
    content: "> ";
    color: var(--acento);
  }
  .titular {
    color: var(--suave);
    font-size: 1.125rem;
  }
  .proyectos {
    display: grid;
    gap: 1.5rem;
  }
  .contactos {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contactos li {
    padding: 0.4rem 0;
  }
  .etiqueta {
    color: var(--suave);
    display: block;
  }
  footer {
    border-top: 4px solid var(--borde);
    color: var(--suave);
    font-size: 0.8rem;
    padding: 1.5rem 1rem;
    text-align: center;
  }
  @media (min-width: 40rem) {
    h1 {
      font-size: 1.75rem;
    }
    h2 {
      font-size: 1.25rem;
    }
  }
</style>
