<script>
	/**
	 * @type {{ _id: string; title: string; desc: string; content: string; slug: string;}}
	 */
	export let article;
</script>

<div class="container border-top py-3">
	<a href={`/learning-centre/${article.slug}`} class="text-decoration-none text-secondary">
		<div class="row">
			<div class="col-4">
				<p>img here</p>
			</div>
			<div class="col-8">
				<h2>{article.title}</h2>
				<p>{article.desc}</p>
			</div>
		</div>
	</a>
</div>
