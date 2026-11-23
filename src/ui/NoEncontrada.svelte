<script lang="ts">
  interface Props {
    inicio: string;
  }

  const { inicio }: Props = $props();
</script>

<main class="pagina">
  <h1>404</h1>
  <p>This page doesn't exist.</p>
  <p><a href={inicio}>Back to home</a></p>
</main>

<style>
  .pagina {
    margin: 0 auto;
    max-width: var(--ancho-max);
    padding: var(--espacio-16) var(--espacio-4);
  }
</style>
