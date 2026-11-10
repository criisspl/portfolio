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
    padding: 2rem 0;
  }
  h2 {
    font-size: 1rem;
  }
  .prompt {
    color: var(--acento);
  }
  @media (min-width: 40rem) {
    h2 {
      font-size: 1.25rem;
    }
  }
</style>
