<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    id: string;
    titulo: string;
    children: Snippet;
  }

  const { id, titulo, children }: Props = $props();
</script>

<section {id} aria-labelledby={`t-${id}`}>
  <h2 id={`t-${id}`}><span class="prompt" aria-hidden="true">&gt;&nbsp;</span>{titulo}</h2>
  {@render children()}
</section>

<style>
  section {
    padding: var(--espacio-8) 0;
  }
  h2 {
    font-size: var(--titulo-2);
  }
  .prompt {
    color: var(--acento);
  }
</style>
