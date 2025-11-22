<script>
	import { page } from '$app/stores';
	import logo from '$lib/assets/logo.png';
	export let items = [];

	$: currentPath = $page.url.pathname;
</script>

<header class="flex w-full items-center justify-between bg-[#EEE9E1] px-6 py-5">
	<div class="flex items-center gap-3">
		<img src={logo} alt="Logo" class="h-8 w-8" />
		<div class="text-xl font-bold text-[#4F3117]">Quest Giver</div>
	</div>

	<div class="flex items-center gap-6">
		<nav class="flex items-center gap-6">
			{#each items as item}
				<a
					href={item.href}
					class="px-1 text-lg
          {currentPath === item.href
						? 'font-semibold text-[#3E2612]'
						: 'text-[#4F3117] hover:text-[#7A5C3E]'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
		<button
			class="ml-4 rounded bg-[#4F3117] px-4 py-1 font-medium text-[#EEE9E1] hover:bg-[#3E2612]"
		>
			Login
		</button>
	</div>
</header>
