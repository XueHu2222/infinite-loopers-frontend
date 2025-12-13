<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';

	let { children } = $props();
</script>

<Menu items={[
	{ label: 'Home', href: '/home' },
	{ label: 'Quest Log', href: '/quest-log' },
	{ label: 'Calendar', href: '/calendar'},
	{ label: 'Shop', href: '/shop'}
]} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
