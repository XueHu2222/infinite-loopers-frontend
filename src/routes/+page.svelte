<script>
	import knight from '$lib/assets/knight.png';
	import star from '$lib/assets/star.png';
	import parchment from '$lib/assets/review-panel.png';
	import ratingStar from '$lib/assets/review-star.png';

	const reviews = [
		{
			quote: "Finally an app that actually makes my brain cooperate. Total game-changer.",
			name: "Maya"
		},
		{
			quote: "Feels like my tasks are cheering me on. I'm getting things done without burning out.",
			name: "Theo"
		},
		{
			quote: "For the first time ever, I don't dread my to-do list. This app just totally gets me.",
			name: "Iris"
		}
	]
</script>

<section class="flex flex-col-reverse items-center justify-between bg-[#E8DCCD] px-6 py-12 sm:px-28 sm:py-20 lg:flex-row">
	<div class="mt-6 text-center lg:mt-0 lg:text-left">
		<h1 class="font-['IM_Fell_Great_Primer_SC'] text-3xl tracking-[-0.5%] text-[#5a3e1b] sm:text-4xl md:text-5xl">
			Turn your daily <br />
			tasks into quests!
		</h1>

		<p class="mt-4 font-['Inter',sans-serif] text-base font-medium tracking-wide text-[#68635C] sm:mt-6 sm:text-lg md:text-lg">
			Stay motivated by turning everyday <br />
			chores into fun challenges!
		</p>

		<button class="mt-6 cursor-pointer rounded-lg bg-[#4F3117] px-6 py-2 font-['IM_Fell_Great_Primer_SC'] text-lg text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#3E2612] sm:mt-10 sm:px-8 sm:py-3 sm:text-xl">
			SIGN UP FREE
		</button>
	</div>

	<div class="relative flex w-full justify-center lg:w-auto lg:justify-end">
        <img src={star} alt="star" class="absolute w-60 z-1 top-1 right-1/4 lg:w-80"/>
        <img src={knight} alt="knight" class="w-60 z-2 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)] lg:w-80"/>
    </div>
</section>

<section class="px-6 py-16 sm:px-12 lg:px-28 lg:py-24 bg-[#FAF6F0]">
	<h2 class="text-center font-['IM_Fell_Great_Primer_SC'] text-4xl sm:text-5xl text-[#5a3e1b] mb-16">
		Reviews From Fellow Adventurers
	</h2>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
		{#each reviews as review}
			<div class="relative hover:-translate-y-3 transition-transform duration-300">
				<img 
					src={parchment} 
					alt="parchment" 
					class="w-full pointer-events-none select-none"
				/>

				<div class="absolute inset-0 flex flex-col justify-center items-center px-8 pt-16 pb-10 text-center">
					<!-- Stars -->
					<div class="flex gap-1 mb-6">
						{#each Array(5) as _}
							<img src={ratingStar} alt="star" class="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
						{/each}
					</div>

					<p class="text-[#4a3728] font-['IM_Fell_Great_Primer_SC'] 
					           text-lg sm:text-xl md:text-2xl leading-tight tracking-wider max-w-xs mx-auto">
						{review.quote}
					</p>

					<p class="mt-6 text-[#6b5540] font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl">
						- {review.name}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>
