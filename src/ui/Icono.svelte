<script module lang="ts">
  export type NombreIcono = "persona" | "carpeta" | "sobre" | "codigo";
</script>

<script lang="ts">
  interface Props {
    nombre: NombreIcono;
  }

  const { nombre }: Props = $props();
</script>

<!-- Icono decorativo (píxeles en cuadrícula de 16): el significado lo da siempre el texto de al lado. -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  {#if nombre === "persona"}
    <path d="M6 2h4v4H6zM3 8h10v6H3z" />
  {:else if nombre === "carpeta"}
    <path d="M1 3h6v2h8v9H1z" />
  {:else if nombre === "sobre"}
    <path fill-rule="evenodd" d="M1 3h14v10H1zM3 5h10v6H3z" />
    <path d="M3 5h2v1h2v1h2V6h2V5h2v1h-2v1h-2v1H7V7H5V6H3z" />
  {:else}
    <path
      d="M5 3h2v2H5zM3 5h2v2H3zM1 7h2v2H1zM3 9h2v2H3zM5 11h2v2H5zM9 3h2v2H9zM11 5h2v2h-2zM13 7h2v2h-2zM11 9h2v2h-2zM9 11h2v2H9z"
    />
  {/if}
</svg>
