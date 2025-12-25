<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/Logo.png';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Popover, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let { items } = $props();
	let currentPath = $derived(page.url.pathname);
	let mobileMenuOpen = writable(false);

	function toggleMobileMenu() {
		mobileMenuOpen.update((value) => !value);
	}

	let user = $state(null);
	let tourStep = $state(0);

	onMount(async () => {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) return;

		user = JSON.parse(storedUser);

		const res = await fetch('http://localhost:3011/users/status', {
			credentials: 'include'
		});

		const data = await res.json();

		if (!data.hasFinishedTour) {
			tourStep = 1;
		}
	});

	function goToStep2() {
		tourStep = 0;
		goto('/home?step=2');
	}

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

<header class="relative z-45 bg-[#EEE9E1] px-4 py-3 sm:px-8 sm:py-5">
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
					<div class="relative inline-block">
						<a
							id={item.label === 'Quest Log' ? 'step-1-quest-log' : ''}
							href={item.href}
							class="px-2 transition-all duration-300
            {currentPath === item.href ? 'font-semibold' : ''}
            {tourStep === 1 && item.label === 'Quest Log'
								? 'quest-log-active relative z-60'
								: 'z-10 text-[#4F3117] hover:text-[#7A5C3E]'}"
						>
							{item.label}
						</a>

						{#if tourStep === 1 && item.label === 'Quest Log'}
							<div
								class="animate-in fade-in zoom-in absolute top-full left-1/2 z-70 mt-5 w-80 -translate-x-1/2 duration-300"
							>
								<div
									class="border-x-12px border-b-12px mx-auto h-0 w-0 border-x-transparent border-b-[#4F3117]"
								></div>

								<div
									class="rounded-xl border-4 border-[#4F3117] bg-[#EEE9E1] p-6 font-['IM_Fell_Great_Primer_SC'] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
								>
									<h3
										class="mb-3 flex items-center gap-2 text-2xl font-bold tracking-tight text-[#4F3117]"
									>
										📜 Quest Call
									</h3>

									<p class="mb-6 text-lg leading-relaxed text-[#5A3E1B]">
										Dear adventurer, this is the <span class="font-bold text-[#4F3117]"
											>starting point</span
										>
										of your journey. You can enter
										<span class="mx-0.5 rounded-sm bg-[#4F3117] px-1 text-[#EEE9E1]">Quest Log</span
										> to set up your first focused goal!
									</p>

									<div class="flex justify-end">
										<button
											class="cursor-pointer rounded-lg bg-[#4F3117] px-5 py-2 text-base font-bold text-[#EEE9E1] shadow-md transition-colors hover:bg-[#3E2612]"
											onclick={(e) => {
												e.preventDefault();
												goToStep2();
											}}
										>
											Next Step
										</button>
									</div>
								</div>
							</div>
						{/if}
					</div>
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

{#if tourStep === 1}
	<div
		class="backdrop-blur-2px fixed inset-0 z-40 bg-black/60"
		onclick={closeTour}
		role="presentation"
	></div>
{/if}

<style>
	@keyframes pulse-highlight {
		0% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(79, 49, 23, 0.7);
		}
		70% {
			transform: scale(1.1);
			box-shadow: 0 0 0 15px rgba(79, 49, 23, 0);
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(79, 49, 23, 0);
		}
	}

	.quest-log-active {
		animation: pulse-highlight 2s infinite ease-in-out;
		background-color: #4f3117 !important;
		color: #eee9e1 !important;
		border-radius: 6px;
		padding: 4px 12px;
	}
</style>
