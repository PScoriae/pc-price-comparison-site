<script>
	import '$pcss';
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	/**
	 * @type {{ pcParts: any[]; type: any; }}
	 */
	export let data;

	let searchTerm = '';

	$: items = data.pcParts.filter((pcPart) => {
		return pcPart.name.toLowerCase().includes(searchTerm);
	});
	let type = data.type;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<div class="my-5 flex justify-center">
	<input
		type="text"
		placeholder="Search"
		class="input input-primary w-full max-w-xs"
		bind:value={searchTerm}
	/>
</div>

<LightPaginationNav
	totalItems={items.length}
	{pageSize}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
/>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Seller</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each paginatedItems as item}
				<tr class="hover">
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-20 h-20">
									<img src={item.imgUrl} alt="{item.name} image" />
								</div>
							</div>
						</div>
					</td>
					<td>
						{#if item.name.length > 120}
							<div class="font-bold">{`${item.name.slice(0, 100)}...`}</div>
						{:else}
							<div class="font-bold">{item.name}</div>
						{/if}
					</td>
					<td>{`RM${item.price}`}</td>
					<td>{item.sellerName}</td>
					<th>
						<a href={`/products/${type}/${item._id}`} class="btn btn-ghost">Details</a>
					</th>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Seller</th>
				<th />
			</tr>
		</tfoot>
	</table>
</div>

<LightPaginationNav
	totalItems={items.length}
	{pageSize}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
/>
