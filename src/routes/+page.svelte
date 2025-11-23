<script>
	import knight from '$lib/assets/knight.png';
	import star from '$lib/assets/star.png';
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
