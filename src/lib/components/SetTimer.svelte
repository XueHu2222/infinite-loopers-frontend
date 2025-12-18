<script>
	import { goto } from "$app/navigation";

    let { showModal = $bindable(), selectedTask } = $props();

    /**
     * @type {HTMLDialogElement}
     */
    let dialog;

    $effect(() => {
        if (showModal) dialog?.showModal();
    });

    function close() {
        showModal = false;
        dialog.close();
    }

    function startTimer() {
        close();

        goto(`/work-timer`);
    }

</script>

<dialog
    bind:this={dialog}
    onclose={close}
    onclick={(e) => {
        if (e.target === dialog) close();
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
            Set Timer for: {selectedTask.title}
        </h2>

        <button
            onclick={close}
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

    <div class="p-6 space-y-4">
        <p class="text-[#4F3117]">Configure your timer here:</p>
        <input
            type="number"
            placeholder="Minutes"
            class="w-full p-3 border-2 border-[#ad8a6c] rounded-lg text-lg"
        />
        <button
            onclick={startTimer}
            class="
                bg-[#fff8e1] border-2 border-[#ad8a6c]
                px-4 py-2 text-lg rounded-lg
                cursor-pointer
                transition-all duration-200 ease-in-out
                hover:bg-[#f1e0c5] hover:scale-[1.03]
            "
        >
            Start Timer
        </button>
    </div>
</dialog>
