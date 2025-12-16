<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { children } = $props();
</script>

<Menu items={[
	{ label: 'Home', href: '/home' },
	{ label: 'Quest Log', href: '/quest-log' },
	{ label: 'Progress', href: '/progress' },
	{ label: 'Achievements', href: '/achievements' },
	{ label: 'Calendar', href: '/calendar'},
	{ label: 'Shop', href: '/shop'}
]} />

<Modal />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
