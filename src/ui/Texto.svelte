<script lang="ts">
  import { esMarcador } from "../lib/marcadores.ts";

  interface Props {
    texto: string;
  }

  const { texto }: Props = $props();
</script>

{#if esMarcador(texto)}
  <span class="marcador" data-marcador>{texto}</span>
{:else}
  {texto}
{/if}

<style>
  .marcador {
    color: var(--aviso);
    border: 2px dashed var(--aviso);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    padding: 0 0.4rem;
    overflow-wrap: anywhere;
  }
</style>
