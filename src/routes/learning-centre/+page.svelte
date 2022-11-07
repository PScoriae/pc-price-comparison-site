<script lang="ts">
	import '$pcss';

	const articles = [
		{ name: 'CPU', desc: 'The brain of your PC.', img: '/learning-articles-images/cpu.webp' },
		{
			name: 'Memory',
			desc: 'The short term memory that the CPU uses.',
			img: '/learning-articles-images/memory.webp'
		},
		{
			name: 'Motherboard',
			desc: 'A printed circuit board in which all other PC components are connected to.',
			img: '/learning-articles-images/motherboard.webp'
		},
		{
			name: 'GPU',
			desc: "An add-in card that boosts your PC's graphics compute performance.",
			img: '/learning-articles-images/gpu.webp'
		},
		{
			name: 'Storage',
			desc: 'Where you can store all your files.',
			img: '/learning-articles-images/storage.webp'
		},
		{
			name: 'PSU',
			desc: 'This is what keeps your PC fed with electricity.',
			img: '/learning-articles-images/psu.webp'
		},
		{
			name: 'Case',
			desc: 'Think of it as a home for all the PC components.',
			img: '/learning-articles-images/case.webp'
		},
		{
			name: 'Cooling',
			desc: "PC's get can hot so we need some cooling!",
			img: '/learning-articles-images/cooling.webp'
		}
	];
</script>

<svelte:head>
	<title>Learning Centre</title>
</svelte:head>

<div class="grid place-items-center">
	<div class="w-1/2">
		{#each articles as article}
			<div class="card lg:card-side bg-base-100 shadow-xl mt-2">
				<figure>
					<img
						src={article.img}
						alt={`Picture of ${article.name}`}
						class="object-cover h-48 w-48"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">{article.name}</h2>
					<p>{article.desc}</p>
					<div class="card-actions justify-end">
						<a href={`/learning-centre/${article.name.toLowerCase()}`} class="btn btn-primary"
							>Read more</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
