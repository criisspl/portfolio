<script lang="ts">
  import { hrefPublico } from "../lib/marcadores.ts";
  import type { Proyecto } from "../lib/tipos.ts";
  import EnlaceExterno from "./EnlaceExterno.svelte";
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
  <ul class="etiquetas" aria-label="Technologies">
    <!-- Clave por índice: lista estática y una tecnología repetida haría fallar `each_key_duplicate`. -->
    {#each proyecto.tecnologias as tecnologia, i (i)}
      <li>{tecnologia}</li>
    {/each}
  </ul>
  <p class="enlace">
    {#if href}
      <EnlaceExterno {href}>View {proyecto.nombre} on GitHub</EnlaceExterno>
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
    padding: var(--espacio-6);
  }
  h3 {
    color: var(--texto);
    font-size: var(--titulo-3);
    margin-bottom: var(--espacio-2);
  }
  p {
    margin: 0;
    max-width: var(--ancho-lectura);
  }
  .etiquetas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--espacio-2);
    list-style: none;
    margin: var(--espacio-4) 0 var(--espacio-1);
    padding: 0;
  }
  .etiquetas li {
    border: var(--grosor-fino) solid var(--suave);
    color: var(--texto);
    font: 500 var(--texto-xs) / 1.5 var(--mono);
    padding: calc(var(--espacio-1) / 2) var(--espacio-2);
  }
</style>
