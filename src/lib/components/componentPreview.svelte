<script>
	/**
	 * @type {{ _id: string; name: string; shortDesc: string; desc: string; }}
	 */
	export let article;
</script>

<div class="container border-top py-3">
	<div class="row">
		<div class="col-4">
			<p>img here</p>
		</div>
		<div class="col-8">
			<h2>{article.name}</h2>
			<p>{article.shortDesc}</p>
		</div>
	</div>
</div>
