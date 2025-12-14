<script>
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';
	let isLoading = false;

	async function handleSignUp() {
		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match!';
			return;
		}

		isLoading = true;
		errorMessage = '';

		try {
			const response = await fetch('http://localhost:3012/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, email, password })
			});

		// try {
		// 	const response = await fetch('http://localhost:3012/auth/register', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({ username, email, password })
		// 	});

			const data = await response.json();

			if (data.success) {
				alert('Registration successful! Please sign in.');
				window.location.href = '/signin';
			} else {
				errorMessage = data.message || 'Registration failed';
			}
		} catch (error) {
			errorMessage = 'Failed to connect to server';
			console.error('Registration error:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#EEE9E1]">
	<div class="relative w-full max-w-md rounded-lg bg-[#E8DCCD] border-4 border-[#4F3117] p-8 shadow-lg">
		<!-- Sign Up Title -->
		<h1 class="mb-8 text-center text-3xl font-['IM_Fell_Great_Primer_SC'] text-[#4F3117]">Sign Up</h1>

		{#if errorMessage}
			<div class="mb-4 rounded bg-red-100 p-3 text-red-700">
				{errorMessage}
			</div>
		{/if}
		<form on:submit|preventDefault={handleSignUp} class="space-y-6">
			<!-- Username Field -->
			<div>
				<label for="username" class="mb-2 block text-xl font-['IM_Fell_Great_Primer_SC'] text-[#4F3117]">
					Username
				</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					placeholder="Enter username..."
					class="w-full rounded border border-[#D4C5B0] bg-white px-3 py-2 text-[#4F3117] placeholder-[#A89078] focus:border-[#4F3117] focus:outline-none"
					required
				/>
			</div>

			<!-- Email Field -->
			<div>
				<label for="email" class="mb-2 block text-xl font-['IM_Fell_Great_Primer_SC'] text-[#4F3117]"> Email </label>
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
				<label for="password" class="mb-2 block font-['IM_Fell_Great_Primer_SC'] text-xl text-[#4F3117]">
					Password
				</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Enter password..."
					class="w-full rounded border border-[#D4C5B0] bg-white px-3 py-2 text-[#4F3117] placeholder-[#A89078] focus:border-[#4F3117] focus:outline-none"
					required
				/>
			</div>

			<!-- Confirm Password Field -->
			<div>
				<label for="confirmPassword" class="mb-2 block font-['IM_Fell_Great_Primer_SC'] text-xl text-[#4F3117]">
					Confirm password
				</label>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Confirm password..."
					class="w-full rounded border border-[#D4C5B0] bg-white px-3 py-2 text-[#4F3117] placeholder-[#A89078] focus:border-[#4F3117] focus:outline-none"
					required
				/>
			</div>

			<!-- Sign Up Button -->
			<button
				type="submit"
				disabled={isLoading}
				class="w-full rounded font-['IM_Fell_Great_Primer_SC'] bg-[#4F3117] py-2.5 font-medium text-[#EEE9E1] transition hover:bg-[#3E2612] disabled:opacity-50"
			>
				{isLoading ? 'SIGNING UP...' : 'SIGN UP'}
			</button>
		</form>

		<!-- Sign In Link -->
		<div class="mt-4 text-center font-['IM_Fell_Great_Primer_SC'] text-lg text-[#4F3117]">
			Already have an account?
			<a href="/signin" class="font-medium text-[#7A5C3E] hover:underline">Sign in here</a>
		</div>
	</div>
</div>
