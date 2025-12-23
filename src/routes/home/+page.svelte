<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import room from '$lib/assets/home-page/room.png';
	import sky from '$lib/assets/home-page/sky.png';
	import focusButton from '$lib/assets/home-page/focus-button.png';

	import ChooseQuest from '$lib/components/ChooseQuest.svelte';
	let showModal = $state(false);

	import hourglassIcon from '$lib/assets/hourglass.png';
	import scrollIcon from '$lib/assets/home-page/scroll.png';
	import streakIcon from '$lib/assets/home-page/streak.png';
	import questLog from '$lib/assets/questLog.png';

	let { data } = $props();

	let tourStep = $state(0);

	$effect(() => {
		if (page.url.searchParams.get('step') === '2') {
			tourStep = 2;
		}
	});

	function finishTour() {
		tourStep = 0;
		window.history.replaceState({}, '', window.location.pathname);
		localStorage.setItem('tour_finished', 'true');
	}
</script>

{#if tourStep === 2}
	<button
		type="button"
		class="fixed inset-0 z-40 h-full w-full cursor-default border-none bg-black/60 backdrop-blur-[2px]"
		onclick={finishTour}
		aria-label="Close tutorial"
	></button>
{/if}

<section
	class="relative grid place-items-center border-b-2 border-[#4F3117]"
	style="background-image: url({sky}); background-size: cover;"
>
	<div class="relative aspect-square w-full max-w-[600px] overflow-hidden">
		<img
			src={room}
			alt="room"
			class="h-full w-full object-contain drop-shadow-[0px_5px_5px_rgba(0,0,0,0.2)]"
		/>
		<img
			src={data.character.imageUrl}
			alt={data.character.name}
			class="absolute top-1/2 left-1/2 z-10 h-28 w-28 -translate-x-1/2 translate-y-[-10%] object-contain sm:h-40 sm:w-40"
		/>

		{#each data.decorations as deco}
			<img
				src={deco.imageUrl}
				alt={deco.name}
				class="absolute"
				style="
            bottom: {deco.position?.bottom};
            top: {deco.position?.top};
            left: {deco.position?.left};
            right: {deco.position?.right};
            width: {deco.position?.width};
            transform: translateX({deco.position?.translateX || '0'}) translateY({deco.position
					?.translateY || '0'});"
			/>
		{/each}
	</div>

	<button
		onclick={() => (showModal = true)}
		class="absolute bottom-0 left-1/2 z-10 flex h-30 w-58 -translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center font-['IM_Fell_Great_Primer_SC'] text-2xl tracking-[-0.5%] text-[#5a3e1b] transition-colors duration-100 hover:text-[#B69476] sm:h-40 sm:w-78 sm:text-3xl md:text-4xl"
		style="background-image: url({focusButton}); background-size: contain; background-position: center; background-repeat: no-repeat;"
	>
		Focus Now
	</button>
</section>

<ChooseQuest tasks={data.tasks} bind:showModal />

<section
	class="relative flex flex-col items-center bg-[#E8DCCD] px-4 pt-16 pb-20 sm:pt-20 lg:pt-24"
>
	<div class="relative mb-5 sm:absolute sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-5 lg:left-8">
		<div
			class="flex flex-col gap-3 rounded-xl p-2 transition-all duration-300
          {tourStep === 2
				? 'quest-log-active relative z-[50] border-2 border-[#4F3117] bg-[#EEE9E1]/40 shadow-[0_0_40px_rgba(255,255,255,0.4)]'
				: ''}"
		>
			<a
				href="/wardrobe"
				class="block cursor-pointer rounded-lg bg-[#4F3117] px-6 py-3 font-['IM_Fell_Great_Primer_SC'] text-xl text-[#EEE9E1] transition-colors hover:bg-[#3E2612]"
			>
				Open Wardrobe
			</a>

			<a
				href="/attic"
				class="block cursor-pointer rounded-lg bg-[#4F3117] px-6 py-3 font-['IM_Fell_Great_Primer_SC'] text-xl text-[#EEE9E1] transition-colors hover:bg-[#3E2612]"
			>
				Open Attic
			</a>
		</div>

		{#if tourStep === 2}
			<div
				transition:fly={{ x: 20, duration: 600 }}
				class="absolute top-0 left-full z-[60] ml-10 w-[350px]"
			>
				<div
					class="absolute top-10 -left-4 h-0 w-0 border-y-[15px] border-r-[15px] border-y-transparent border-r-[#4F3117]"
				></div>

				<div
					class="rounded-xl border-4 border-[#4F3117] bg-[#EEE9E1] p-8 font-['IM_Fell_Great_Primer_SC'] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
				>
					<h3 class="mb-3 flex items-center gap-2 text-2xl font-bold tracking-tight text-[#4F3117]">
						Customization & Collection
					</h3>
					<p class="mb-6 text-lg leading-relaxed text-[#5A3E1B]">
						Personalize your character and room! Earn coins by completing your <span
							class="font-bold text-[#4F3117]">Quests</span
						>, then spend them at the <span class="font-bold text-[#4F3117]">Shop</span> to unlock new
						outfits and items.
					</p>
					<div class="flex justify-end">
						<button
							class="cursor-pointer rounded-lg bg-[#4F3117] px-6 py-2 text-lg font-bold text-[#EEE9E1] shadow-md transition-transform hover:scale-105 hover:bg-[#3E2612]"
							onclick={finishTour}
						>
							Got it!
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div
		class="grid max-w-6xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3"
	>
		<div
			class="flex w-full max-w-[300px] flex-col items-center rounded-lg border-4 border-[#4f311747] bg-[#E3D3BF] p-6 sm:p-8"
		>
			<p class="font-['IM_Fell_Great_Primer_SC'] text-xl text-[#5A3E1B] sm:text-2xl">
				Focused for:
			</p>
			<img src={hourglassIcon} alt="hourglass" class="my-4 h-20 w-auto sm:h-30" />
			<p class="font-['IM_Fell_Great_Primer_SC'] text-3xl text-[#5A3E1B]">00:00:00</p>
		</div>

		<div
			class="flex w-full max-w-[300px] flex-col items-center rounded-lg border-4 border-[#4f311747] bg-[#E3D3BF] p-6 sm:p-8"
		>
			<p class="font-['IM_Fell_Great_Primer_SC'] text-xl text-[#5A3E1B] sm:text-2xl">
				Quests completed:
			</p>
			<img src={scrollIcon} alt="scroll" class="my-4 h-20 w-auto sm:h-30" />
			<p class="font-['IM_Fell_Great_Primer_SC'] text-3xl text-[#5A3E1B]">10</p>
		</div>

		<div
			class="flex w-full max-w-[300px] flex-col items-center rounded-lg border-4 border-[#4f311747] bg-[#E3D3BF] p-6 sm:p-8"
		>
			<p class="font-['IM_Fell_Great_Primer_SC'] text-xl text-[#5A3E1B] sm:text-2xl">
				Current streak:
			</p>
			<img src={streakIcon} alt="streak" class="my-4 h-20 w-auto sm:h-30" />
			<p class="font-['IM_Fell_Great_Primer_SC'] text-3xl text-[#5A3E1B]">8</p>
		</div>
	</div>

	<a
		href="/quest-log"
		class="group mt-16 flex flex-col items-center transition-transform duration-300 hover:scale-105"
	>
		<img src={questLog} alt="quest log" class="mb-2 h-auto w-64 drop-shadow-sm" />
		<p class="font-['IM_Fell_Great_Primer_SC'] text-3xl text-[#5A3E1B]">Open quest log</p>
	</a>
</section>

<style>
	@keyframes pulse-highlight {
		0% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(79, 49, 23, 0.7);
		}
		70% {
			transform: scale(1.05);
			box-shadow: 0 0 0 20px rgba(79, 49, 23, 0);
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(79, 49, 23, 0);
		}
	}

	.quest-log-active {
		animation: pulse-highlight 2s infinite ease-in-out;
	}
</style>
