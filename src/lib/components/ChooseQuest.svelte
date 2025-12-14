<script>
    import SetTimer from "./SetTimer.svelte";

    let { showModal = $bindable(), tasks } = $props();
    let dialog = $state();

    /**
	 * @type {null}
	 */
    let selectedTask = $state(null);
    let showTimerModal = $state(false);

    $effect(() => {
        if (showModal) dialog.showModal();
    });


     /**
	 * @param {any} task
	 */
     function selectTask(task) {
        selectedTask = task;
        showTimerModal = true;
        dialog.close();
    }
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
        {#if tasks && tasks.length > 0}
        <ul class="list-none p-0 m-0 space-y-3">
            {#each tasks as task}
            <li>
                <button
                onclick={() => selectTask(task)}
                class="
                    bg-[#fff8e1]
                    border-2 border-[#ad8a6c]
                    w-full
                    p-3
                    text-lg
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:bg-[#f1e0c5]
                    hover:scale-[1.03]
                "
            >
                {task.title}
                </button>
            </li>
            {/each}
        </ul>
        {:else}
            <h1>No quests</h1>
        {/if}
    </div>
</dialog>

{#if showTimerModal && selectedTask}
    <SetTimer bind:showModal={showTimerModal} {selectedTask} />
{/if}
