<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;
	let error: any;

	async function login() {
		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.status !== 200) error = 'An error occured';
		else goto('/configurator');
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			{#if error}
				<h1 class="text-5xl font-bold">Please try again.</h1>
				<p class="py-6">{error}</p>
			{:else}
				<h1 class="text-5xl font-bold">Login</h1>
				<p class="py-6">Welcome back!</p>
			{/if}
		</div>
		<form on:submit|preventDefault={login}>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<div class="form-control">
						<input
							type="email"
							placeholder="email"
							bind:value={email}
							class="input input-bordered"
						/>
					</div>
					<div class="form-control">
						<input
							type="password"
							placeholder="password"
							bind:value={password}
							class="input input-bordered"
						/>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<a href="/" class="label-text-alt link link-hover">Forgot password?</a>
						</label>
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary">Login</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
