<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="grid h-[80vh] place-items-center">
	<div class="hero">
		<div class="hero-content flex-col lg:flex-row-reverse bg-base-300 rounded-xl">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Sign up</h1>
				<p class="py-6">Welcome to the PC Part Price Comparison Site!</p>
			</div>
			<form action="?/signup" method="POST">
				<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div class="card-body">
						<div class="form-control">
							<input
								id="username"
								name="username"
								type="text"
								required
								placeholder="name"
								class="input input-bordered"
							/>
						</div>
						<div class="form-control">
							<input
								id="password"
								name="password"
								type="password"
								required
								placeholder="password"
								class="input input-bordered"
							/>
						</div>
						{#if form?.user}
							<p>Username is taken.</p>
						{/if}
						<div class="form-control mt-6">
							<button type="submit" class="btn btn-primary">Sign up</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
