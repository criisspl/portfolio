<script lang="ts">
  import { hrefDeContacto } from "../lib/marcadores.ts";
  import type { Contacto } from "../lib/tipos.ts";
  import EnlaceExterno from "./EnlaceExterno.svelte";
  import Icono from "./Icono.svelte";
  import Texto from "./Texto.svelte";

  interface Props {
    contactos: Contacto[];
  }

  const { contactos }: Props = $props();
  const iconos = { Email: "sobre", GitHub: "codigo", LinkedIn: "persona" } as const;
</script>

<ul class="contactos">
  {#each contactos as contacto (contacto.etiqueta)}
    {@const href = hrefDeContacto(contacto)}
    {@const icono = iconos[contacto.etiqueta as keyof typeof iconos]}
    <li>
      <span class="etiqueta">
        {#if icono}<Icono nombre={icono} />{/if}{contacto.etiqueta}
      </span>
      {#if href?.startsWith("mailto:")}
        <a class="ver" {href}>{contacto.valor}</a>
      {:else if href}
        <EnlaceExterno {href}>{contacto.valor}</EnlaceExterno>
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
    padding: var(--espacio-1) 0;
  }
  .etiqueta {
    align-items: center;
    color: var(--suave);
    display: flex;
    gap: var(--espacio-2);
  }
</style>
