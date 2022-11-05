<script lang="ts">
	import '$pcss';
	import type { PartsList } from '$lib/types/types';
	import { compressProductName, currencyFormatter, clickToCopy } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	const partsList: PartsList = data.partsList.partsList;
	const partsListId = data.partsList.partsListId;

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

	const arrayPartsList = Object.entries(partsList);

	const sum = getPrice(partsList);

	const pressLink = () => (pressedCopyLink = true);

	const partsLink = `pcpartstool.pierreccesario.com/configurator/${partsListId}`;
	let pressedCopyLink = false;
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
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Component</th>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
			</tr>
		</tfoot>
	</table>
</div>

<div class="my-3 grid grid-cols-3 grid-rows-3 place-items-center">
	<div class="col-start-1 row-span-3 stats shadow">
		<div class="stat">
			<div class="stat-title">Total Cost</div>
			<div class="stat-value">{currencyFormatter.format(sum)}</div>
		</div>
	</div>
	<div id="parts-list-id" class="col-start-2 col-end-3 row-start-1 row-end-2 text-md">
		{partsLink}
	</div>
	<button
		class="btn btn-primary col-start-2 col-end-3 row-start-2"
		use:clickToCopy={'div#parts-list-id'}
		on:click={pressLink}>copy link</button
	>
	<div class="col-start-2 col-end-3 row-start-3">
		{#if pressedCopyLink}
			Link copied!
		{/if}
	</div>
</div>
