<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.png';
	import { writable } from 'svelte/store';

	let { items } = $props();
	let currentPath = $derived(page.url.pathname);
	let mobileMenuOpen = writable(false);

	function toggleMobileMenu() {
		mobileMenuOpen.update(value => !value);
	}
</script>

<header class="bg-[#EEE9E1] px-4 sm:px-8 py-3 sm:py-5">
	<section class="flex items-center justify-between">
		<a href="/" class="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90">
			<img src={logo} alt="Logo" class="h-7 sm:h-9 w-7 sm:w-9" />
			<div class="text-lg sm:text-xl font-semibold text-[#4F3117] font-['Amita',cursive]">
				Quest Giver
			</div>
		</a>

		<nav class="hidden md:flex items-center gap-6 text-[#4F3117] font-['Inter',sans-serif] font-medium text-sm sm:text-base">
			{#each items as item}
				<a href={item.href} class="px-1 {currentPath === item.href ? 'font-semibold text-[#3E2612]' : 'hover:text-[#7A5C3E] text-[#4F3117]'}">
					{item.label}
				</a>
			{/each}
			<button class="ml-4 rounded bg-[#4F3117] px-3 sm:px-4 py-1 sm:py-1.5 font-medium cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612]">
				Sign in
			</button>
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
				{#each items as item}
					<li>
						<a href={item.href} class="block px-2 py-1 rounded {currentPath === item.href ? 'font-semibold text-[#3E2612]' : 'text-[#4F3117] hover:text-[#7A5C3E]'}" onclick={() => mobileMenuOpen.set(false)}>
							{item.label}
						</a>
					</li>
				{/each}
				<li>
					<button class="w-full rounded bg-[#4F3117] px-3 py-1.5 font-medium text-[#EEE9E1] hover:bg-[#3E2612]">
						Sign in
					</button>
				</li>
			</ul>
		</section>
	{/if}
</header>
