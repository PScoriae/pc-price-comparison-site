<script lang="ts">
	import '$pcss';
	import ArticlePreview from '$lib/components/articlePreview.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Learning Centre</title>
</svelte:head>

<div class="grid h-[80vh] place-items-center">
	<div class="mt-10 text-4xl">Learning Centre</div>
	{#each data.learningArticles as article}
		<ArticlePreview {article} />
	{/each}
</div>
