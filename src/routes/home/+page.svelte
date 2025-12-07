<script>
    import room from '$lib/assets/home-page/room.png';
    import sky from '$lib/assets/home-page/sky.png';
    import focusButton from '$lib/assets/home-page/focus-button.png';
    import hourglassIcon from '$lib/assets/hourglass.png';
    import scrollIcon from '$lib/assets/home-page/scroll.png';
    import streakIcon from '$lib/assets/home-page/streak.png';
    import questLog from '$lib/assets/questLog.png';
</script>

<section class="relative grid place-items-center border-b-2 border-[#4F3117]" style="background-image: url({sky}); background-size: cover;">
    <div class="relative w-full max-w-[600px] aspect-square overflow-hidden">
        <img src={room} alt="room" class="w-full h-full object-contain drop-shadow-[0px_5px_5px_rgba(0,0,0,0.2)]">

        <!-- Decoration slots - more to be added -->
        <img src="" alt="plant" class="absolute w-[13%] bottom-[33%] left-[26%]">
        <img src="" alt="lamp" class="absolute w-[13%] top-1/2 right-[25%]">
    </div>

    <a href="/home" class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-58 h-30 sm:w-78 sm:h-40 flex items-center justify-center font-['IM_Fell_Great_Primer_SC'] text-2xl sm:text-3xl md:text-4xl tracking-[-0.5%] text-[#5a3e1b] cursor-pointer hover:text-[#B69476] transition-colors duration-100"
        style="background-image: url({focusButton}); background-size: contain; background-position: center; background-repeat: no-repeat;">
        Focus Now
    </a>
</section>

<section class="flex flex-col items-center bg-[#E8DCCD] pt-20 pb-20">
  <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col items-center rounded-lg p-4 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747]">
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-2xl text-center">Focused for:</p>
        <img src={hourglassIcon} alt='hourglass' class="w-auto h-20 sm:h-30 mt-4 mb-2"/>
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl text-center mt-2">00:00:00</p>
      </div>

      <div class="flex flex-col items-center rounded-lg p-4 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747]">
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-2xl text-center">Quest completed:</p>
        <img src={scrollIcon} alt='scroll' class="w-auto h-20 sm:h-30 mt-4 mb-2"/>
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl text-center mt-2">10</p>
      </div>

      <div class="flex flex-col items-center rounded-lg p-4 sm:p-8 bg-[#E3D3BF] border-4 border-[#4f311747]">
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-2xl text-center">Current streak:</p>
        <img src={streakIcon} alt='streak' class="w-auto h-20 sm:h-30 mt-4 mb-2"/>
        <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl text-center mt-2">8</p>
      </div>
  </div>

  <a href="/quest-log" class="hover:scale-103 transition-transform duration-300">
    <img src={questLog} alt='quest log' class="w-68 h-62 mb-2 mt-16"/>
    <p class="font-['IM_Fell_Great_Primer_SC'] text-[#5A3E1B] text-3xl text-center">Open quest log</p>
  </a>
</section>
