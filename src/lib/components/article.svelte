<script>
	/**
	 * @type {{ _id: string; title: string; desc: string; content: string; imgUrl: string; slug: string;}}
	 */
	export let article;
	import '$pcss';
</script>

<div class="grid h-[80vh]">
	<div class="flex items-center justify-center">
		<div class="card w-1/2 h-1/2 max-w-96 max-h-96 bg-base-300 shadow-lg">
			<figure><img src={article.imgUrl} alt={article.title} /></figure>
			<div class="card-body">
				<h2 class="card-title">{article.title}</h2>
				<p>{article.desc}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div>
	</div>
</div>
