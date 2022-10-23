<script lang="ts">
	import type { PageData } from "./$types";
  import ComponentDetailed from "$lib/components/article.svelte";

  export let data: PageData
  const article = data.article
</script>

<svelte:head>
  <title>{article.title} - Learning Centre</title>
</svelte:head>

<ComponentDetailed {article} />