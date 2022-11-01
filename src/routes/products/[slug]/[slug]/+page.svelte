<script>
	import '$pcss';

	export let data;

	let pcPart = data.pcPart;

	let splitName = pcPart.name.split(' ');
</script>

<img src={pcPart.imgUrl} alt="Product" class="w-[30vh] h-[30vh] my-10" />
<div class="stats stats-vertical shadow">
	<div class="stat place-items-center">
		<div class="stat-title">Product Name</div>
		<div class="stat-value">
			{#each splitName as name, i}
				{#if i === 9 || i === 18 || i === 27}
					{name} <br />
				{:else}
					{name}&nbsp;
				{/if}
			{/each}
		</div>
	</div>

	<div class="stat place-items-center">
		<div class="stat-title">Price</div>
		<div class="stat-value">RM{pcPart.price}</div>
	</div>

	<div class="stat place-items-center">
		<div class="stat-title">Seller</div>
		<div class="stat-value text-secondary">{pcPart.sellerName}</div>
	</div>

	<div class="stat place-items-center">
		<div class="stat-value text-secondary">
			<a href={pcPart.itemUrl} target="_blank" rel="noreferrer" class="btn">Link to Product Page</a>
		</div>
	</div>
</div>
