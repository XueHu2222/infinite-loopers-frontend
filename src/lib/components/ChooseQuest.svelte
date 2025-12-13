<script>
    let { showModal = $bindable() } = $props();
    let dialog = $state();

    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

<dialog
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={(e) => {
        if (e.target === dialog) dialog.close();
    }}
    class="
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[520px] max-w-[90vw]
        bg-[#fdf3e7]
        border-[6px] border-double border-[#ad8a6c]
        rounded-xl
        shadow-[0_0_20px_rgba(0,0,0,0.5)]
        font-['IM_Fell_Great_Primer_SC']
        p-0
    "
>
    <div
        class="
            flex items-center justify-between
            text-[#4F3117]
            px-6 py-4
            border-b-2 border-[#ad8a6c]
        "
    >
        <h2 class="text-2xl">
            Choose a quest to focus on
        </h2>

        <button
            onclick={() => dialog.close()}
            aria-label="Close"
            class="
                bg-transparent border-none
                text-xl text-[#4F3117]
                cursor-pointer
                transition-transform duration-200
                hover:rotate-12
            "
        >
            ✖
        </button>
    </div>

    <div class="p-6">
        <ul class="list-none p-0 m-0 space-y-3">
            <li
                class="
                    bg-[#fff8e1]
                    border-2 border-[#ad8a6c]
                    px-4 py-3
                    text-lg
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:bg-[#f1e0c5]
                    hover:scale-[1.03]
                "
            >
                🗡️ Stretch
            </li>

            <li
                class="
                    bg-[#fff8e1]
                    border-2 border-[#ad8a6c]
                    px-4 py-3
                    text-lg
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:bg-[#f1e0c5]
                    hover:scale-[1.03]
                "
            >
                📜 Do math homework
            </li>

            <li
                class="
                    bg-[#fff8e1]
                    border-2 border-[#ad8a6c]
                    px-4 py-3
                    text-lg
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:bg-[#f1e0c5]
                    hover:scale-[1.03]
                "
            >
                🏹 Clean room
            </li>
        </ul>
    </div>
</dialog>
