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

<main id="contenido">
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
  .portada {
    padding: 3rem 0 2rem;
  }
  h1 {
    color: var(--acento);
    font-size: 1.25rem;
    overflow-wrap: anywhere;
  }
  .titular {
    color: var(--suave);
    font-size: 1.125rem;
  }
  .proyectos {
    display: grid;
    gap: 1.5rem;
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
  }
</style>
