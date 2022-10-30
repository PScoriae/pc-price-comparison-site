<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string;
	let email: string;
	let password: string;
	let error: any;

	async function signup(event: any) {
		const res = await fetch('/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				name
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res);
		if (!res.ok) {
			const body = await res.json();
			error = body.message;
		} else goto('/configurator');
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			{#if error}
				<h1 class="text-5xl font-bold">{error}</h1>
				<p class="py-6">Please try again.</p>
			{:else}
				<h1 class="text-5xl font-bold">Sign up now!</h1>
				<p class="py-6">Welcome to the PC Part Price Comparison Site!</p>
			{/if}
		</div>
		<form on:submit|preventDefault={signup}>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<div class="form-control">
						<input type="text" placeholder="name" bind:value={name} class="input input-bordered" />
					</div>
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
						<label class="label">
							<a href="/" class="label-text-alt link link-hover">Forgot password?</a>
						</label>
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary">Sign up</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
