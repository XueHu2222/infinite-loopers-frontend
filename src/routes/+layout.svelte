<script>
import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
</script>

<Menu items={[
	{ label: 'Home', href: '/' },
	{ label: 'Quest Log', href: '/quest-log' }
]} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<slot />