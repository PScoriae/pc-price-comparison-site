<script>
	// not in use
	/**
	 * @type {{ imgPath: any; title: any; paragraphs: string[]; name: any; }}
	 */
	export let article;
	import '$pcss';
</script>

<div class="grid grid-col-3 my-10 place-items-center">
	<img
		src={`/learning-articles-images/${article.name}.webp`}
		alt={`${article.name} image`}
		class="mb-10"
	/>
	<div class="text-4xl">{article.title}</div>
</div>
<div class="mx-20">
	{#each article.paragraphs as paragraph}
		<p>
			{paragraph}
		</p>
		<div class="divider" />
	{/each}
</div>

<div class="grid my-10 place-items-center">
	<a href={`/products/${article.name}`} class="btn btn-primary">See {article.name}</a>
</div>
