<script>
	/**
	 * @type {{ _id: string; title: string; desc: string; content: string; imgUrl: string; slug: string;}}
	 */
	export let article;
	import '$pcss';
</script>

<a
	href={`/learning-centre/${article.slug}`}
	class="grid grid-rows-3 grid-flow-col justify-evenly btn w-2/3"
>
	<div class="row-span-3 ...">{article.imgUrl}</div>
	<div class="col-span-2 ...">{article.title}</div>
	<div class="row-span-2 col-span-2 ...">{article.desc}</div>
</a>
