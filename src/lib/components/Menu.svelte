<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.png';
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
	function handleLogout() {
		localStorage.removeItem('user');
		user = null;
		window.location.href = '/signin';
	}
</script>

<header class="bg-[#EEE9E1] px-4 sm:px-8 py-3 sm:py-5">
	<section class="flex items-center justify-between">
		<a href="{ user ? '/home' : '/'}" class="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90">
			<img src={logo} alt="Logo" class="h-7 sm:h-9 w-7 sm:w-9" />
			<div class="text-lg sm:text-xl font-semibold text-[#4F3117] font-['Amita',cursive]">
				Quest Giver
			</div>
		</a>

		<nav class="hidden md:flex items-center gap-6 text-[#4F3117] font-['Inter',sans-serif] font-medium text-sm sm:text-base">
			{#if user}
                {#each items as item}
				    <a href={item.href} class="px-1 {currentPath === item.href ? 'font-semibold text-[#3E2612]' : 'hover:text-[#7A5C3E] text-[#4F3117]'}">
					    {item.label}
				    </a>
			    {/each}
                <span class="font-medium text-[#4F3117]">
                    Welcome, {user["username"]}!
                </span>
                <button onclick={handleLogout} class="ml-4 rounded-lg bg-[#4F3117] px-3 sm:px-5 py-2 sm:py-2 cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612]">
                    Logout
                </button>
			{:else} 
                <a href="/signup" class="ml-4 rounded-lg bg-[#4F3117] px-3 sm:px-5 py-2 sm:py-2 cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612]">
                    Sign Up
                </a>

                <a href="/signin" class="rounded-lg bg-[#4F3117] px-3 sm:px-5 py-2 sm:py-2 cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612]">
                    Sign In
                </a>
            {/if}
		</nav>

		<!-- Button for mobile menu -->
		<button class="md:hidden" aria-label="Open mobile menu" onclick={toggleMobileMenu}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#4F3117]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</section>

	<!-- Mobile menu -->
	{#if $mobileMenuOpen}
		<section class="md:hidden bg-[#EEE9E1] mt-2 border-t">
			<ul class="flex flex-col px-4 py-4 gap-3">
                {#if user}
				    {#each items as item}
					    <li>
						    <a href={item.href} class="block px-2 py-1 {currentPath === item.href ? 'font-semibold text-[#3E2612]' : 'text-[#4F3117]'}" onclick={() => mobileMenuOpen.set(false)}>
							    {item.label}
						    </a>
					    </li>
				    {/each}
				<li>
                    <button onclick={handleLogout} class="rounded bg-[#4F3117] px-3 sm:px-5 py-2 sm:py-2 cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612]">
                        Logout
                    </button>
				</li>
                {:else}
                <li>
                    <a href="/signup" class="block px-2 py-1 cursor-pointer {currentPath === '/signup' ? 'font-semibold text-[#3E2612]' : 'text-[#3E2612]'}">
                        Sign Up
                    </a>
                </li>

                <li>
                    <a href="/signin" class="block px-2 py-1 cursor-pointer {currentPath === '/signin' ? 'font-semibold text-[#3E2612]' : 'text-[#3E2612]'}">
                        Login
                    </a>
                </li>
                {/if}
			</ul>
		</section>
	{/if}
</header>
