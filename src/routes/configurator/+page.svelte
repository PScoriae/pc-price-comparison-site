<script lang="ts">
	import '$pcss';
	import { partsList } from '$lib/stores/configuratorStore';
	import type { PartsList } from '$lib/types/types';
	import { compressProductName, currencyFormatter } from '$lib/utils';
	import { page } from '$app/stores';
	import ShortUniqueId from 'short-unique-id';
	import { error } from '@sveltejs/kit';

	const uid = new ShortUniqueId({ length: 10 });

	let hasItem = 0;
	for (const [key, value] of Object.entries($partsList)) {
		if (value) {
			hasItem = 1;
			break;
		}
	}

	const capitalise = (s: string) => {
		if (['gpu', 'cpu', 'psu'].includes(s)) return `${s.toUpperCase()}`;
		return `${s[0].toUpperCase() + s.slice(1)}`;
	};

	const getPrice = (partsList: PartsList) => {
		let sum = 0;
		for (const [key, value] of Object.entries(partsList)) {
			if (value) sum += Number(value.price);
		}
		return sum;
	};

	const removeProduct = (type: string) => {
		// @ts-ignore
		$partsList[type] = null;
	};

	const genPartsListId = (partsList: PartsList) => {
		for (const [key, value] of Object.entries(partsList)) {
			if (value) return uid();
		}
	};
	const savePartsList = async () => {
		if (!$page.data.user) throw error(400, 'error');
		const res = await fetch('/api/save-partslist', {
			method: 'POST',
			body: JSON.stringify({ partsListId, partsList: $partsList, user: $page.data.user }),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(await res.json());
	};

	$: partsListId = genPartsListId($partsList);

	$: arrayPartsList = Object.entries($partsList);

	$: sum = getPrice($partsList);
</script>

<svelte:head>
	<title>Configurator</title>
</svelte:head>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Component</th>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th id="add-remove-product" />
			</tr>
		</thead>
		<tbody>
			{#each arrayPartsList as part}
				<tr class="hover">
					<td class="font-bold">
						<a href={`/learning-centre/${part[0]}`} class="hover:underline">{capitalise(part[0])}</a
						>
					</td>
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-20 h-20">
									{#if part[1] !== null}
										<a href={`/products/${part[0]}/${part[1]._id}`}>
											<img src={part[1].imgUrl} alt="" />
										</a>
									{/if}
								</div>
							</div>
						</div>
					</td>
					<td>
						{#if part[1] !== null}
							<a href={`/products/${part[0]}/${part[1]._id}`} class="hover:underline">
								{compressProductName(part[1].name)}
							</a>
						{/if}
					</td>
					<td>
						{#if part[1] !== null}
							{currencyFormatter.format(Number(part[1].price))}
						{/if}
					</td>
					<td>
						{#if part[1] === null}
							<a href={`/products/${part[0]}`} class="btn btn-ghost">Add Product</a>
						{:else}
							<button class="btn btn-ghost" on:click={() => removeProduct(part[0])}>Remove</button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Component</th>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th id="add-remove-product" />
			</tr>
		</tfoot>
	</table>
</div>

<div class="my-3 grid grid-cols-3 place-items-center">
	<div class="col-start-1 stats shadow">
		<div class="stat">
			<div class="stat-title">Total Cost</div>
			<div class="stat-value">{currencyFormatter.format(sum)}</div>
		</div>
	</div>
	<input
		type="text"
		placeholder="Parts List Id"
		class="input input-primary w-full max-w-xs col-start-2"
		bind:value={partsListId}
	/>
	<div class="col-start-3">
		{#if hasItem}
			<button class="btn btn-primary" on:click={savePartsList}>Save Parts List</button>
		{:else}
			<button class="btn btn-primary btn-disabled" on:click={savePartsList}>Save Parts List</button>
		{/if}
	</div>
</div>
