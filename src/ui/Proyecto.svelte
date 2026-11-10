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
    border: var(--grosor-borde) solid var(--borde);
    box-shadow: var(--sombra-pixel);
    padding: var(--espacio-5);
  }
  h3 {
    color: var(--acento);
    font-size: var(--pixel-s);
  }
  .etiquetas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--espacio-2);
    list-style: none;
    margin: var(--espacio-4) 0;
    padding: 0;
  }
  .etiquetas li {
    border: var(--grosor-fino) solid var(--suave);
    color: var(--suave);
    font-family: var(--pixel);
    font-size: var(--pixel-s);
    line-height: 1.4;
    /* 0.3rem = 1.2 x espacio-1 (fuera de la escala, se conserva el aspecto) */
    padding: calc(var(--espacio-1) * 1.2) var(--espacio-2);
  }
  .enlace {
    margin: 0;
  }
</style>
