<script lang="ts">
	import ComponentPreview from '$lib/components/articlePreview.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container py-5">
	{#each data.learningArticles as article}
		<ComponentPreview {article} />
	{/each}
</div>
