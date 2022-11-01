<script lang="ts">
	import type { PageData } from './$types';
	import Article from '$lib/components/article.svelte';
	import '$pcss';

	export let data: PageData;
	const article = data.article;
</script>

<svelte:head>
	<title>{article.title} - Learning Centre</title>
</svelte:head>

<Article {article} />
