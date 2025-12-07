<script>
    import room from '$lib/assets/home-page/room.png';
    import sky from '$lib/assets/home-page/sky.png';
    import focusButton from '$lib/assets/home-page/focus-button.png';
</script>

<section class="relative grid place-items-center w-screen border-b-2 border-[#4F3117]" style="background-image: url({sky}); background-size: cover;">
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
