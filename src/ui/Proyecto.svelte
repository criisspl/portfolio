<script lang="ts">
  import { hrefPublico } from "../lib/marcadores.ts";
  import type { Proyecto } from "../lib/tipos.ts";
  import Texto from "./Texto.svelte";

  interface Props {
    proyecto: Proyecto;
  }

  const { proyecto }: Props = $props();
  const href = $derived(hrefPublico(proyecto.enlace));
</script>

<article class="tarjeta">
  <h3>{proyecto.nombre}</h3>
  <p>{proyecto.descripcion}</p>
  <ul class="etiquetas" aria-label="Tecnologías">
    <!-- Clave por índice: lista estática y una tecnología repetida haría fallar `each_key_duplicate`. -->
    {#each proyecto.tecnologias as tecnologia, i (i)}
      <li>{tecnologia}</li>
    {/each}
  </ul>
  <p class="enlace">
    {#if href}
      <a {href}>Ver {proyecto.nombre}</a>
    {:else}
      <Texto texto={proyecto.enlace} />
    {/if}
  </p>
</article>

<style>
  .tarjeta {
    background: var(--panel);
    border: 4px solid var(--borde);
    box-shadow: 6px 6px 0 var(--borde);
    padding: 1.25rem;
  }
  h3 {
    color: var(--acento);
    font-size: 1rem;
  }
  .etiquetas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 1rem 0;
    padding: 0;
  }
  .etiquetas li {
    border: 2px solid var(--suave);
    color: var(--suave);
    font-family: var(--pixel);
    font-size: 0.75rem;
    line-height: 1.4;
    padding: 0.3rem 0.5rem;
  }
  .enlace {
    margin: 0;
  }
</style>
