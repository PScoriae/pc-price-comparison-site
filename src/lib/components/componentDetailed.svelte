<script>
	/**
	 * @type {{ _id: string; title: string; desc: string; content: string; slug: string;}}
	 */
	export let article;
</script>

<div class="container">
  <div class="row py-3">
    <div class="col-4">
      <p>img here</p>
    </div>
    <article class="col-8">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </article>
  </div>
</div>