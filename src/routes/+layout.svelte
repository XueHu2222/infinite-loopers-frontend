<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import Menu from '$lib/components/Menu.svelte';

	let { children } = $props();
</script>

<Menu items={[
	{ label: 'Home', href: '/' },
	{ label: 'Task', href: '/task' }
]} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
