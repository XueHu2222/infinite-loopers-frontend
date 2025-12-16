<script>
	import { openModal } from '../../modalStore.js';
	let { data } = $props();
	const userId = data.user.id;
	let placedDecorations = $state(data.placedDecorations);
	
	async function toggleDecoration(decorationId) {
        const isPlaced = placedDecorations.includes(decorationId);

		try {
			const res = await fetch(`http://localhost:3011/users/${userId}/decorations/placed`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ decorationId, placed: !isPlaced })
			});

			const result = await res.json();

			if (res.ok && result.message) {
				if (isPlaced) {
					placedDecorations = placedDecorations.filter((id) => id !== decorationId);
				} else {
					placedDecorations = [...placedDecorations, decorationId];
				}
				openModal(result.message, 'success');
			} else {
				openModal(result.message, 'error');
			}
		} catch (error) {
			openModal('Error occurred while placing decoration.', 'error');
		}
	}
</script>

<h1 class="bg-[#F8F3ED] pt-5 text-center font-['IM_Fell_Great_Primer_SC'] text-3xl text-[#4F3117]">
	Attic of Wonders
</h1>

{#if data.decorations.length === 0 }
	<h1 class="bg-[#F8F3ED] min-h-screen pt-5 text-center font-['IM_Fell_Great_Primer_SC'] underline text-xl text-[#4F3117]">
		You don't have any decorations yet. Buy some from the shop to decorate your room!
	</h1>
{:else}
<section class="grid min-h-screen auto-rows-max items-start gap-8 bg-[#F8F3ED] p-8 font-['IM_Fell_Great_Primer_SC'] sm:grid-cols-2 lg:grid-cols-3">
	{#each data.decorations as decoration}
		<article class="flex flex-col rounded-md border-4 border-[#4f311747] bg-[#fbf5ec] p-6 text-center">
			<div class="mb-6 flex justify-center">
				<img src={decoration.imageUrl} alt={decoration.name} class="h-32 w-32 rounded-lg border border-[#e0d3c4] bg-white object-contain p-2"/>
			</div>

			<div class="mb-4 flex flex-col items-center">
				<h2 class="mb-1 text-xl text-[#4F3117]">
					{decoration.name}
				</h2>
			</div>

			<button
				class="cursor-pointer rounded-lg bg-[#4F3117] px-6 py-2 text-lg text-[#EEE9E1] hover:bg-[#3E2612] disabled:cursor-default disabled:opacity-50"
				onclick={() => toggleDecoration(decoration.id)}>
                {placedDecorations.includes(decoration.id) ? 'Remove' : 'Place'}
			</button>
		</article>
	{/each}
</section>
{/if}
