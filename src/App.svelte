<script lang="ts">
  import { contenido } from "./data/contenido.ts";
  import Contactos from "./ui/Contactos.svelte";
  import Proyecto from "./ui/Proyecto.svelte";
  import Seccion from "./ui/Seccion.svelte";
  import Texto from "./ui/Texto.svelte";

  const sobreMi = { id: "sobre-mi", nombre: "Sobre mí" };
  const proyectos = { id: "proyectos", nombre: "Proyectos" };
  const contacto = { id: "contacto", nombre: "Contacto" };
  const secciones = [sobreMi, proyectos, contacto];
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

<main id="contenido" tabindex="-1">
  <section class="portada" aria-labelledby="titulo">
    <h1 id="titulo"><Texto texto={contenido.nombre} /></h1>
    <p class="titular"><Texto texto={contenido.titular} /></p>
  </section>

  <Seccion id={sobreMi.id} titulo={sobreMi.nombre}>
    <!-- Clave por índice: lista estática y dos párrafos iguales harían fallar `each_key_duplicate`. -->
    {#each contenido.sobreMi as parrafo, i (i)}
      <p><Texto texto={parrafo} /></p>
    {/each}
  </Seccion>

  <Seccion id={proyectos.id} titulo={proyectos.nombre}>
    <div class="proyectos">
      {#each contenido.proyectos as proyecto (proyecto.nombre)}
        <Proyecto {proyecto} />
      {/each}
    </div>
  </Seccion>

  <Seccion id={contacto.id} titulo={contacto.nombre}>
    <Contactos contactos={contenido.contactos} />
  </Seccion>
</main>

<footer>
  <p>Hecho con Svelte 5 · sin rastreadores ni recursos de terceros</p>
</footer>

<style>
  .saltar {
    position: absolute;
    left: var(--espacio-2);
    top: calc(var(--espacio-16) * -1);
    background: var(--acento);
    color: var(--fondo);
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
  .cabecera {
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--fondo);
    border-bottom: var(--grosor-borde) solid var(--borde);
  }
  nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 0 var(--espacio-1);
    list-style: none;
    margin: 0 auto;
    max-width: var(--ancho-max);
    padding: var(--espacio-1) var(--espacio-2);
  }
  nav a {
    display: inline-block;
    font-family: var(--mono);
    font-size: var(--texto-xs);
    font-weight: 500;
    letter-spacing: var(--espaciado-letras);
    text-transform: uppercase;
    min-height: var(--toque-min);
    line-height: var(--toque-min);
    padding: 0 var(--espacio-1);
    text-decoration: none;
  }
  nav a:hover {
    text-decoration: underline;
  }
  main {
    margin: 0 auto;
    max-width: var(--ancho-max);
    padding: 0 var(--espacio-4);
  }
  .portada {
    padding: var(--espacio-12) 0 var(--espacio-8);
  }
  h1 {
    color: var(--acento);
    font-size: var(--titulo-1);
    overflow-wrap: anywhere;
  }
  .titular {
    color: var(--suave);
    font-size: var(--texto-lg);
  }
  .proyectos {
    display: grid;
    gap: var(--espacio-6);
  }
  footer {
    border-top: var(--grosor-borde) solid var(--borde);
    color: var(--suave);
    font-size: var(--texto-xs);
    padding: var(--espacio-6) var(--espacio-4);
    text-align: center;
  }
</style>
