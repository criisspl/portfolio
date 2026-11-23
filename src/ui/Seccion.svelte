<script lang="ts">
  import type { Snippet } from "svelte";
  import Icono, { type NombreIcono } from "./Icono.svelte";

  interface Props {
    id: string;
    titulo: string;
    icono: NombreIcono;
    separada?: boolean;
    children: Snippet;
  }

  const { id, titulo, icono, separada = false, children }: Props = $props();
</script>

<section {id} class:separada aria-labelledby={`t-${id}`}>
  <h2 id={`t-${id}`}><Icono nombre={icono} />{titulo}</h2>
  {@render children()}
</section>

<style>
  section {
    padding-bottom: var(--espacio-14);
  }
  .separada {
    border-top: var(--grosor-borde) solid var(--borde);
    padding: var(--espacio-8) 0 0;
  }
  h2 {
    align-items: center;
    color: var(--suave);
    display: flex;
    font-size: var(--titulo-2);
    gap: var(--espacio-3);
    letter-spacing: 0.12em;
    margin-bottom: var(--espacio-6);
    text-transform: uppercase;
  }
  h2 :global(.ic) {
    color: var(--acento);
    height: var(--espacio-6);
    width: var(--espacio-6);
  }
</style>
