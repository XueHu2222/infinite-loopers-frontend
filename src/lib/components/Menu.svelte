<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/Logo.png';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	let { items } = $props();
	let currentPath = $derived(page.url.pathname);
	let mobileMenuOpen = writable(false);

	function toggleMobileMenu() {
		mobileMenuOpen.update((value) => !value);
	}

	let user = $state(null);

	// Check if user is logged in when component mounts
	onMount(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			user = JSON.parse(storedUser);
		}
	});

	// Logout function
	async function handleLogout() {
		try {
        await fetch('http://localhost:3011/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('user');
		localStorage.removeItem('userId');
		localStorage.removeItem('email');
        user = null;
        window.location.href = '/signin';
    } catch (err) {
        console.error('Logout failed', err);
    }
}
</script>

<header class="bg-[#EEE9E1] px-4 py-3 sm:px-8 sm:py-5">
	<section class="flex items-center justify-between">
		<a
			href={user ? '/home' : '/'}
			class="flex cursor-pointer items-center gap-2 hover:opacity-90 sm:gap-3"
		>
			<img src={logo} alt="Logo" class="h-7 w-7 sm:h-9 sm:w-9" />
			<div class="font-['Amita',cursive] text-lg font-semibold text-[#4F3117] sm:text-xl">
				Quest Giver
			</div>
		</a>

		<nav
			class="hidden items-center gap-6 font-['Inter',sans-serif] text-sm font-medium text-[#4F3117] sm:text-base md:flex"
		>
			{#if user}
				{#each items as item}
					<a
						href={item.href}
						class="px-1 {currentPath === item.href
							? 'font-semibold text-[#3E2612]'
							: 'text-[#4F3117] hover:text-[#7A5C3E]'}"
					>
						{item.label}
					</a>
				{/each}
				<span class="font-medium text-[#4F3117]">
					Welcome, {user['username']}!
				</span>
				<button
					onclick={handleLogout}
					class="ml-4 cursor-pointer rounded-lg bg-[#4F3117] px-3 py-2 text-[#EEE9E1] hover:bg-[#3E2612] sm:px-5 sm:py-2"
				>
					Logout
				</button>
			{:else}
				<a
					href="/signup"
					class="ml-4 cursor-pointer rounded-lg bg-[#4F3117] px-3 py-2 text-[#EEE9E1] hover:bg-[#3E2612] sm:px-5 sm:py-2"
				>
					Sign Up
				</a>

				<a
					href="/signin"
					class="cursor-pointer rounded-lg bg-[#4F3117] px-3 py-2 text-[#EEE9E1] hover:bg-[#3E2612] sm:px-5 sm:py-2"
				>
					Sign In
				</a>
			{/if}
		</nav>

		<!-- Button for mobile menu -->
		<button class="md:hidden" aria-label="Open mobile menu" onclick={toggleMobileMenu}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-[#4F3117]"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</section>

	<!-- Mobile menu -->
	{#if $mobileMenuOpen}
		<section class="mt-2 border-t bg-[#EEE9E1] md:hidden">
			<ul class="flex flex-col gap-3 px-4 py-4">
				{#if user}
					{#each items as item}
						<li>
							<a
								href={item.href}
								class="block px-2 py-1 {currentPath === item.href
									? 'font-semibold text-[#3E2612]'
									: 'text-[#4F3117]'}"
								onclick={() => mobileMenuOpen.set(false)}
							>
								{item.label}
							</a>
						</li>
					{/each}
					<li>
						<button
							onclick={handleLogout}
							class="cursor-pointer rounded bg-[#4F3117] px-3 py-2 text-[#EEE9E1] hover:bg-[#3E2612] sm:px-5 sm:py-2"
						>
							Logout
						</button>
					</li>
				{:else}
					<li>
						<a
							href="/signup"
							class="block cursor-pointer px-2 py-1 {currentPath === '/signup'
								? 'font-semibold text-[#3E2612]'
								: 'text-[#3E2612]'}"
						>
							Sign Up
						</a>
					</li>

					<li>
						<a
							href="/signin"
							class="block cursor-pointer px-2 py-1 {currentPath === '/signin'
								? 'font-semibold text-[#3E2612]'
								: 'text-[#3E2612]'}"
						>
							Login
						</a>
					</li>
				{/if}
			</ul>
		</section>
	{/if}
</header>
