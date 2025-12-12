<script>
	import knight from '$lib/assets/knight.png';

	let email = '';
	let password = '';

	let errorMessage = '';
	let isLoading = false;

	async function handleSignIn() {
		isLoading = true;
		errorMessage = '';

		try {
			const response = await fetch('http://localhost:3011/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include'
			});
			
		// try {
		// 	const response = await fetch('http://localhost:3012/auth/login', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({ email, password })
		// 	});

			const data = await response.json();

			if (data.success) {
				localStorage.setItem('userId', data.user.id);
				localStorage.setItem('user', JSON.stringify(data.user));

				localStorage.setItem('email', data.user.email);

				window.location.href = '/home';
			} else {
				errorMessage = data.message || 'Login failed';
			}
		} catch (error) {
			errorMessage = 'Failed to connect to server';
			console.error('Login error:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#EEE9E1]">
	<div
		class="relative w-full max-w-2xl rounded-lg border-4 border-[#4F3117] bg-[#E8DCCD] p-12 shadow-lg"
	>
		<!-- Sign In Title -->
		<h1 class="mb-8 text-center font-['IM_Fell_Great_Primer_SC'] text-4xl text-[#4F3117]">
			Sign In
		</h1>

		<div class="flex items-center gap-8">
			<!-- Form Section -->
			<form on:submit|preventDefault={handleSignIn} class="flex-1 space-y-6">
				{#if errorMessage}
					<div class="mb-4 rounded bg-red-100 p-3 text-red-700">
						{errorMessage}
					</div>
				{/if}
				<!-- Email Field -->
				<div>
					<label
						for="email"
						class="mb-2 block font-['IM_Fell_Great_Primer_SC'] text-xl text-[#4F3117]"
					>
						Email
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
					<label
						for="password"
						class="mb-2 block font-['IM_Fell_Great_Primer_SC'] text-xl text-[#4F3117]"
					>
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
					<a
						href="/forgot-password"
						class="mt-1 block font-['IM_Fell_Great_Primer_SC'] text-xs text-[#7A5C3E] underline hover:text-[#382a1d]"
					>
						FORGOT YOUR PASSWORD?
					</a>
				</div>

				<!-- Sign In Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full rounded bg-[#4F3117] py-2.5 font-['IM_Fell_Great_Primer_SC'] font-medium text-[#EEE9E1] transition
  hover:bg-[#3E2612] disabled:opacity-50"
				>
					{isLoading ? 'SIGNING IN...' : 'SIGN IN'}
				</button>
			</form>

			<!-- Knight Image -->
			<div class="shrink-0">
				<div class="flex h-48 w-48 items-center justify-center rounded-full bg-[#D2BCA1]">
					<img src={knight} alt="Knight character" class="h-40 w-auto" />
				</div>
			</div>
		</div>
	</div>
</div>
