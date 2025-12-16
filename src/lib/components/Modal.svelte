<script>
    import { isOpen, modalMessage, modalType, closeModal } from '../../modalStore.js';
</script>

{#if $isOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <article class="w-[520px] max-w-[90vw] bg-[#fdf3e7] border-[6px] border-double {$modalType === 'success' ? 'border-green-700' : 'border-red-700'} rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] font-['IM_Fell_Great_Primer_SC'] flex flex-col">
        <header class="flex items-center justify-between px-6 py-4 text-[#4F3117] border-b-2 {$modalType === 'success' ? 'border-green-700' : 'border-red-700'}">
            <h2 class="text-2xl">{$modalType === 'success' ? 'Success' : 'Oops'}</h2>
            <button onclick={closeModal} class="bg-transparent border-none text-xl text-[#4F3117] cursor-pointer transition-transform duration-200 hover:rotate-12">
                ✖
            </button>
        </header>

        <div class="p-6 flex flex-col">
            <p class="text-xl text-[#4F3117] mb-6">{$modalMessage}</p>
            <div class="flex justify-end">
                <button onclick={closeModal} class="bg-[#4F3117] text-[#EEE9E1] px-6 py-2 rounded-lg hover:bg-[#3E2612] cursor-pointer transition-colors">
                    OK
                </button>
            </div>
        </div>
    </article>
</div>
{/if}
