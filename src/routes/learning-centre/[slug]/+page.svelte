<script lang="ts">
	import type { PageData } from "./$types";
  import ComponentDetailed from "$lib/components/componentDetailed.svelte";

  export let data: PageData
  const article = data.article
</script>

<ComponentDetailed {article} />