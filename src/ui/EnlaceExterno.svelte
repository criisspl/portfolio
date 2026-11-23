<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  const { href, children }: Props = $props();
</script>

<a class="ver" {href} target="_blank" rel="noopener noreferrer"
  >{@render children()}<span class="sr"> (opens in a new tab)</span></a
>
