<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/Logo.png';

	import Menu from '$lib/components/Menu.svelte';

	let { children } = $props();
</script>

<Menu items={[
	{ label: 'Home', href: '/' },
	{ label: 'Quest Log', href: '/quest-log' }
]} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex w-full items-center justify-between bg-[#EEE9E1] px-4 sm:px-8 py-3 sm:py-5">
  <a href="/" class="flex items-center gap-2 sm:gap-3">
    <img src={logo} alt="Logo" class="h-7 sm:h-9 w-7 sm:w-9" />
    <div class="text-lg sm:text-xl font-semibold text-[#4F3117] font-['Amita',cursive]">
      Quest Giver
    </div>
  </a>

  <div class="flex items-center gap-3 sm:gap-6 text-[#4F3117] font-['Inter',sans-serif] font-medium text-sm sm:text-base">
    <span>Have an account?</span>
    <a href="/sign-in" class="rounded-md bg-[#4F3117] px-3 sm:px-5 py-1.5 sm:py-2 text-white hover:bg-[#3B240F] transition">
      Sign in
    </a>
  </div>
</header>

<main class="min-h-screen">
  {@render children()}
</main>