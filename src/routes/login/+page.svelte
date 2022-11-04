<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="grid h-[80vh] place-items-center">
	<div class="hero">
		<div class="hero-content flex-col lg:flex-row-reverse bg-base-300 rounded-xl">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Login</h1>
				<p class="py-6">Welcome back!</p>
			</div>
			<form action="?/login" method="POST">
				<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div class="card-body">
						<div class="form-control">
							<input
								id="username"
								name="username"
								type="text"
								required
								placeholder="email"
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
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<a href="/" class="label-text-alt link link-hover">Forgot password?</a>
							</label>
						</div>
						{#if form?.invalid}
							<p>Username and password is required.</p>
						{/if}

						{#if form?.credentials}
							<p>You have entered the wrong credentials.</p>
						{/if}
						<div class="form-control mt-6">
							<button type="submit" class="btn btn-primary">Login</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
