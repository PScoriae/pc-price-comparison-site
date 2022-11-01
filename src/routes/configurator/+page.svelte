<script>
	import '$pcss';
</script>

<svelte:head>
	<title>Configurator</title>
</svelte:head>

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
			<tr class="hover">
				<td>
					<div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="w-20 h-20">
								<img src="" alt="" />
							</div>
						</div>
					</div>
				</td>
				<td>
					<div class="font-bold">test</div>
				</td>
				<td>test</td>
				<td>test</td>
				<th>
					<a href="/" class="btn btn-ghost">Details</a>
				</th>
			</tr>
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
