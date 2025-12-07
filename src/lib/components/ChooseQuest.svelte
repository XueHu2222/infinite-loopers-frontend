<script>
    let { showModal = $bindable(), header, children } = $props();

    let dialog = $state();

    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

<dialog
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
    <div class="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
        {@render header?.()}
        
        <hr class="my-4 border-gray-300" />
        
        <div class="space-y-4">
            {@render children?.()}
        </div>
        
        <hr class="my-4 border-gray-300" />
        
        <button 
            autofocus 
            onclick={() => dialog.close()}
            class="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-150 ease-in-out"
        >
            Close Modal
        </button>
    </div>
</dialog>

<style>
    dialog {
        position: fixed; 
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        border: none;
        padding: 0;
    }
    
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.4);
    }
</style>