<script lang="ts">
	import '$pcss';
	import { page } from '$app/stores';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchTerm = '';

	$: items = data.pcParts.filter((pcPart: Part) => {
		return pcPart.name.toLowerCase().includes(searchTerm);
	});
	let type = data.type;
	let currentPage = 1;
	let pageSize = 10;
	let paginatedItems: Part[];
	$: paginatedItems = paginate({ items, pageSize, currentPage });

	let sortBy = { col: 'price', ascending: true };

	$: sort = (column: string) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a: any, b: any) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		data.pcParts = data.pcParts.sort(sort);
	};
</script>

<div>Hello {$page.data.user.name}!</div>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">Total Parts Lists Saved</div>
		<div class="stat-value">TODO</div>
	</div>
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
				<th on:click={() => sort('name')}>Name</th>
				<th on:click={() => sort('price')}>Price</th>
				<th on:click={() => sort('sellerName')}>Seller</th>
				<th id="add-product" />
			</tr>
		</thead>
		<tbody>
			{#each paginatedItems as item}
				<tr class="hover">
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-20 h-20">
									<a href={`/products/${type}/${item._id}`}
										><img src={item.imgUrl} alt="{item.name} image" /></a
									>
								</div>
							</div>
						</div>
					</td>
					<td>
						<a href={`/products/${type}/${item._id}`}>
							<div class="font-bold">{compressProductName(item.name)}</div>
						</a>
					</td>
					<td>{currencyFormatter.format(Number(item.price))}</td>
					<td>{item.sellerName}</td>
					<td>
						<button class="btn btn-ghost" on:click={() => addProduct(item)}>Add Product</button>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Seller</th>
				<th id="add-product" />
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
