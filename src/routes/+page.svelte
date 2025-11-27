<script>
	import knight from '$lib/assets/knight-landing-page.png';
	import star from '$lib/assets/star.png';
	import parchment from '$lib/assets/review-panel.png';
	import ratingStar from '$lib/assets/review-star.png';
	import coin from '$lib/assets/coin.png';
	import sword from '$lib/assets/sword.png';
	import cats from '$lib/assets/cats.png';
	import hourglass from '$lib/assets/hourglass.png';
	import questLog from '$lib/assets/questLog.png';
	import anvil from '$lib/assets/anvil.png';
	import crystal from '$lib/assets/crystal.png';
	import Footer from '$lib/components/Footer.svelte';

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
	];

	const features = [
		"Boost Motivation",
		"Stay Consistent",
		"Track Your Growth",
		"Grow With Purpose",
		"Focus With Ease",
		"Feel In Control"
	];

	const tools = [
      {imgSrc: hourglass, title: "Hourglass of Focus", subtitle: "(Focus Timer)"},
      {imgSrc: questLog, title: "Adventurer's Quest Log", subtitle: "(To-dos)"},
      {imgSrc: anvil, title: "The Time Smith's Blocks", subtitle: "(Time Blocking)"},
      {imgSrc: crystal, title: "Ritual Stone", subtitle: "(Habits)"}
    ];
</script>

<!-- Hero section -->
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

		<a href="/signup" class="mt-6 cursor-pointer rounded-lg bg-[#4F3117] px-6 py-2 font-['IM_Fell_Great_Primer_SC'] text-lg text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#3E2612] sm:mt-10 sm:px-8 sm:py-3 sm:text-xl inline-block text-center">
    		SIGN UP FREE
		</a>

	</div>

	<div class="relative flex w-full justify-center lg:w-auto lg:justify-end">
        <img src={star} alt="star" class="absolute w-60 z-1 top-1 right-1/4 lg:w-80"/>
        <img src={knight} alt="knight" class="w-60 z-2 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)] lg:w-80"/>
    </div>
</section>

<!-- Reviews section -->
<section class="px-6 py-16 sm:px-12 lg:px-28 lg:py-24 bg-[#FAF6F0]">
	<h2 class="text-center font-['IM_Fell_Great_Primer_SC'] text-4xl sm:text-5xl text-[#4F3117] mb-16">
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
					<div class="flex gap-1 mb-6">
						{#each Array(5) as _}
							<img src={ratingStar} alt="star" class="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
						{/each}
					</div>

					<p class="text-[#4F3117] font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl md:text-2xl leading-tight tracking-tight max-w-xs mx-auto">
						{review.quote}
					</p>

					<p class="mt-6 text-[#4F3117] font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl">
						- {review.name}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Features section -->
<section class="relative bg-[#E8DCCD] py-20 px-6 sm:px-12 lg:px-28 overflow-hidden">
		<h2 class="font-['IM_Fell_Great_Primer_SC'] text-4xl text-center sm:text-5xl lg:text-6xl text-[#4F3117] mb-4">
			Questify your everyday
		</h2>

		<p class="font-['IM_Fell_Great_Primer_SC'] text-[#4F3117] text-center text-lg sm:text-xl lg:text-2xl leading-tight tracking-tight">
			Transform your to-do list into an epic journey. Complete missions,<br/>
			unlock achievements, and watch your real-world progress level you up.
		</p>

		<div class="flex flex-col lg:flex-row items-center justify-center gap-2 mt-20 w-full">
			<div class="flex flex-col gap-8 lg:gap-10 w-full lg:w-auto">
				{#each features.slice(0,3) as feature}
					<div class="flex items-center justify-center gap-5 bg-[#FAF6F0] shadow-xl rounded-full px-15 py-6">
						<img src={coin} alt="coin" class="w-11 h-11" />
						<span class="font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl lg:text-3xl text-[#4F3117]">
							{feature}
						</span>
					</div>
				{/each}
			</div>

			<img src={sword} alt="sword" class="w-52 sm:w-72 lg:w-96 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]"/>

			<div class="flex flex-col gap-8 lg:gap-10 w-full lg:w-auto">
				{#each features.slice(3) as feature}
					<div class="flex items-center justify-center gap-5 bg-[#FAF6F0] rounded-full px-15 py-6 shadow-xl">
						<img src={coin} alt="coin" class="w-11 h-11" />
						<span class="font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl lg:text-3xl text-[#4F3117]">
							{feature}
						</span>
					</div>
				{/each}
			</div>
		</div>
</section>

<!-- Team up section -->
<section class="flex flex-col items-center bg-[#EEE9E1] px-6 py-12 sm:px-28 sm:py-20">
    <h1 class="font-['IM_Fell_Great_Primer_SC'] text-[#4F3117] text-center text-3xl sm:text-4xl md:text-5xl tracking-tight">
        Team up and succeed!
    </h1>

    <h2 class="font-['IM_Fell_Great_Primer_SC'] text-[#4F3117] lowercase text-center text-2xl sm:text-3xl md:text-4xl tracking-tight mb-8">
        Work together, grow together
    </h2>

    <div class="flex flex-col items-center w-full lg:flex-row lg:space-x-12">
        <img src={cats} alt="cats" class="w-full lg:w-[460px] h-auto drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]"/>
        <p class="bg-[#E8DCCD] p-4 lg:p-8 rounded-lg text-center lg:text-left font-['IM_Fell_Great_Primer_SC'] text-[#4F3117] text-xl sm:text-2xl md:text-3xl tracking-tight">
            Squad up and finish quests with friends! Join group sessions, support each other, and celebrate every win.
        </p>
    </div>
</section>

<!-- Ancient tools section -->
<section class="flex flex-col items-center bg-[#E8DCCD] pt-20 px-10 pb-30">
  <h2 class="font-['IM_Fell_Great_Primer_SC'] text-3xl sm:text-4xl md:text-5xl text-[#5A3E1B] text-center tracking-tight">
    Unlock the ancient tools of productivity!
  </h2>
  <h3 class="mt-2 font-['IM_Fell_Great_Primer_SC'] text-lg leading-tight font-medium tracking-tight text-[#5A3E1B] text-center sm:text-xl md:text-2xl">
    Relics of old, each holding powers to strengthen your routine.
  </h3>

  <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {#each tools as tool}
      <div class="flex flex-col items-center rounded-lg p-8 bg-[#EEE9E1] shadow-[0px_5px_5px_rgba(0,0,0,0.5)] hover:-translate-y-3 transition-transform duration-300 border-5 border-[#E6AE36]">
        <img src={tool.imgSrc} alt={tool.title} class="w-auto h-30 mb-4"/>
        <h2 class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-2xl text-center">{tool.title}</h2>
        <h3 class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-xl text-center mt-2">{tool.subtitle}</h3>
      </div>
    {/each}
  </div>
</section>

<Footer />
