<script lang="ts">
  import { hrefDeContacto } from "../lib/marcadores.ts";
  import type { Contacto } from "../lib/tipos.ts";
  import Texto from "./Texto.svelte";

  interface Props {
    contactos: Contacto[];
  }

  const { contactos }: Props = $props();
</script>

<ul class="contactos">
  {#each contactos as contacto (contacto.etiqueta)}
    {@const href = hrefDeContacto(contacto)}
    <li>
      <span class="etiqueta">{contacto.etiqueta}:</span>
      {#if href}
        <a {href}>{contacto.valor}</a>
      {:else}
        <Texto texto={contacto.valor} />
      {/if}
    </li>
  {/each}
</ul>

<style>
  .contactos {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contactos li {
    padding: 0.4rem 0;
  }
  .etiqueta {
    color: var(--suave);
    display: block;
  }
</style>
