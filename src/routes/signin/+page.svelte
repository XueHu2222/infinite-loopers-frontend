<script>
	import knight from '$lib/assets/knight.png';
	
	let email = '';
	let password = '';

	function handleSignIn() {
		// TODO: Connect to backend API
		console.log('Sign in:', { email, password });
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#EEE9E1]">
	<div class="relative w-full max-w-2xl rounded-lg border-4 border-[#4F3117] bg-[#F5F0E8] p-12 shadow-lg">
		<!-- Sign In Title -->
		<h1 class="mb-8 text-center font-serif text-4xl text-[#4F3117]">SIGN IN</h1>

		<div class="flex items-center gap-8">
			<!-- Form Section -->
			<form on:submit|preventDefault={handleSignIn} class="flex-1 space-y-6">
				<!-- Email Field -->
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-[#4F3117]">
						EMAIL
					</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="Enter email address..."
						class="w-full rounded border border-[#D4C5B0] bg-white px-3 py-2 text-[#4F3117] placeholder-[#A89078] focus:border-[#4F3117] focus:outline-none"
						required
					/>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-[#4F3117]">
						PASSWORD
					</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Enter password..."
						class="w-full rounded border border-[#D4C5B0] bg-white px-3 py-2 text-[#4F3117] placeholder-[#A89078] focus:border-[#4F3117] focus:outline-none"
						required
					/>
					<a href="/forgot-password" class="mt-1 block text-xs text-[#7A5C3E] hover:underline">
						FORGOT YOUR PASSWORD?
					</a>
				</div>

				<!-- Sign In Button -->
				<button
					type="submit"
					class="w-full rounded bg-[#4F3117] py-2.5 font-medium text-[#EEE9E1] transition hover:bg-[#3E2612]"
				>
					SIGN IN
				</button>
			</form>

			<!-- Knight Image -->
			<div class="flex-shrink-0">
				<div class="flex h-48 w-48 items-center justify-center rounded-full bg-[#E5DFD3]">
					<img src={knight} alt="Knight character" class="h-40 w-auto" />
				</div>
			</div>
		</div>
	</div>
</div>