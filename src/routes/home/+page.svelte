<script>
    import room from '$lib/assets/home-page/room.png';
    import sky from '$lib/assets/home-page/sky.png';
    import focusButton from '$lib/assets/home-page/focus-button.png';
    import hourglassIcon from '$lib/assets/hourglass.png';
    import scrollIcon from '$lib/assets/home-page/scroll.png';
    import streakIcon from '$lib/assets/home-page/streak.png';
    import questLog from '$lib/assets/questLog.png';
    let { data } = $props();
</script>

<section class="relative grid place-items-center border-b-2 border-[#4F3117]" style="background-image: url({sky}); background-size: cover;">
    <div class="relative w-full max-w-[600px] aspect-square overflow-hidden">
        <img src={room} alt="room" class="w-full h-full object-contain drop-shadow-[0px_5px_5px_rgba(0,0,0,0.2)]">
        <img src={data.character.imageUrl} alt={data.character.name} class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-10%] w-28 h-28 sm:w-40 sm:h-40 object-contain z-10"/>

        {#each data.decorations as deco}
          <img src={deco.imageUrl} alt={deco.name} class="absolute" style="
            bottom: {deco.position?.bottom};
            top: {deco.position?.top};
            left: {deco.position?.left};
            right: {deco.position?.right};
            width: {deco.position?.width};
            transform: translateX({deco.position?.translateX || '0'}) translateY({deco.position?.translateY || '0'});"/>
        {/each}
    </div>

    <a href="/home" class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-58 h-30 sm:w-78 sm:h-40 flex items-center justify-center font-['IM_Fell_Great_Primer_SC'] text-2xl sm:text-3xl md:text-4xl tracking-[-0.5%] text-[#5a3e1b] cursor-pointer hover:text-[#B69476] transition-colors duration-100 z-10"
        style="background-image: url({focusButton}); background-size: contain; background-position: center; background-repeat: no-repeat;">
        Focus Now
    </a>
</section>

<section class="relative bg-[#E8DCCD] pt-16 sm:pt-20 lg:pt-24 pb-20 flex flex-col items-center px-4">
  <a href="/wardrobe" class="relative mb-5 sm:absolute sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-5 lg:left-8 py-3 px-6 font-['IM_Fell_Great_Primer_SC'] text-xl cursor-pointer rounded-lg bg-[#4F3117] text-[#EEE9E1] hover:bg-[#3E2612]">
    Open Wardrobe
  </a>
  <a href="/attic" class="relative mb-5 sm:absolute sm:top-10 sm:left-4 md:top-6 md:left-6 lg:top-20 lg:left-8 py-3 px-6 font-['IM_Fell_Great_Primer_SC'] text-xl cursor-pointer rounded-lg bg-[#4F3117] text-[#EEE9E1] hover:bg-[#3E2612]">
    Open Attic
  </a>

  <div class="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl justify-items-center">
    <div class="flex flex-col items-center rounded-lg p-6 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747] w-full max-w-[300px]">
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-xl sm:text-2xl">Focused for:</p>
      <img src={hourglassIcon} alt='hourglass' class="w-auto h-20 sm:h-30 my-4"/>
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl">00:00:00</p>
    </div>

    <div class="flex flex-col items-center rounded-lg p-6 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747] w-full max-w-[300px]">
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-xl sm:text-2xl">Quests completed:</p>
      <img src={scrollIcon} alt='scroll' class="w-auto h-20 sm:h-30 my-4"/>
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl">10</p>
    </div>

    <div class="flex flex-col items-center rounded-lg p-6 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747] w-full max-w-[300px]">
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-xl sm:text-2xl">Current streak:</p>
      <img src={streakIcon} alt='streak' class="w-auto h-20 sm:h-30 my-4"/>
      <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl">8</p>
    </div>
  </div>

  <a href="/quest-log" class="group flex flex-col items-center mt-16 hover:scale-105 transition-transform duration-300">
    <img src={questLog} alt='quest log' class="w-64 h-auto mb-2 drop-shadow-sm"/>
    <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl">Open quest log</p>
  </a>
</section>
