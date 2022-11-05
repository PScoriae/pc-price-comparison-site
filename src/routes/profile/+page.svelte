<script lang="ts">
	import '$pcss';
	import { page } from '$app/stores';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import type { PageData } from './$types';
	import type { savedPartsList } from '$lib/types/types';
	import { partsListId, partsList } from '$lib/stores/configuratorStore';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const deletePartsList = async (list: savedPartsList) => {
		const res = await fetch('/api/delete-partslist', {
			method: 'POST',
			body: JSON.stringify({
				partsListId: list.partsListId
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok)
			data.partsLists = data.partsLists.filter((partsList: savedPartsList) => {
				return partsList !== list;
			});
	};

	const viewList = (list: savedPartsList) => {
		$partsList = list.partsList;
		$partsListId = list.partsListId;
		goto('/configurator');
	};

	let searchTerm = '';

	$: items = data.partsLists.filter((partsList: any) => {
		return partsList.name.includes(searchTerm);
	});

	let currentPage = 1;
	let pageSize = 10;
	let paginatedItems: savedPartsList[];
	$: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="grid grid-col-3 grid-row-2 my-5 place-items-center">
	<div class="col-start-1 row-span-2 text-2xl">Hello {$page.data.user.name}!</div>

	<div class="stats shadow col-start-2 row-start-1 grid-end-2">
		<div class="stat">
			<div class="stat-title">Total Parts Lists Saved</div>
			<div class="stat-value">{data.partsLists.length}</div>
		</div>
	</div>

	{#if data.partsLists.length === 0}
		<input
			type="text"
			placeholder="Search"
			class="input input-primary input-disabled w-full max-w-xs col-start-2 row-start-2"
			bind:value={searchTerm}
		/>
	{:else}
		<input
			type="text"
			placeholder="Search"
			class="input input-primary w-full max-w-xs col-start-2 row-start-2"
			bind:value={searchTerm}
		/>
	{/if}

	<form action="/logout" method="post" class="col-start-3 row-span-2">
		<button class="btn btn-primary" type="submit">log out</button>
	</form>
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
				<th>Name</th>
				<th>Parts List ID</th>
				<th id="view-list" />
				<th id="delete-list" />
			</tr>
		</thead>
		<tbody>
			{#each paginatedItems as item}
				<tr class="hover">
					<td>
						<div class="font-bold">{item.name}</div>
					</td>
					<td>{item.partsListId}</td>
					<td><button class="btn btn-ghost" on:click={() => viewList(item)}>View List</button></td>
					<td>
						<button class="btn btn-ghost" on:click={() => deletePartsList(item)}>
							Delete List
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Name</th>
				<th>Parts List Id</th>
				<th id="view-list" />
				<th id="delete-list" />
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
