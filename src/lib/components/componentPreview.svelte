<script>
	/**
	 * @type {{ name: string; shortDesc: string; desc: string; }}
	 */
	export let component;
</script>

<div class="container border-top py-3">
	<div class="row">
		<div class="col-4">
			<p>img here</p>
		</div>
		<div class="col-8">
			<h2>{component.name}</h2>
			<p>{component.shortDesc}</p>
		</div>
	</div>
</div>
