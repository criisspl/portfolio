<script lang="ts">
  interface Props {
    inicio: string;
  }

  const { inicio }: Props = $props();
</script>

<main class="pagina">
  <h1>404</h1>
  <p>Esta página no existe.</p>
  <p><a href={inicio}>Volver al inicio</a></p>
</main>

<style>
  .pagina {
    margin: 0 auto;
    max-width: var(--ancho-max);
    padding: var(--espacio-16) var(--espacio-4);
  }
</style>
