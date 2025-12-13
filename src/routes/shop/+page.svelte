<script>
    let { data } = $props();
    let coins = $state(data.user.coins);
    const userId = data.user.id;
    let ownedCharacterIds = $state(data.user.ownedCharacters.map((/** @type {{ characterId: number; }} */ c) => c.characterId));
    
    /**
     * Purchase a character from the shop
	 * @param {number} characterId
	 */
    async function buyCharacter(characterId) {
    try {
        const res = await fetch(`http://localhost:3011/users/${userId}/characters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ characterId })
        });

        const result = await res.json();

        if (res.ok && result.message) {
            coins = result.newCoins;
            ownedCharacterIds = [...ownedCharacterIds, characterId];
            alert(result.message);
        } else {
            alert(result.message || 'Failed to purchase character');
        }
    } catch (error) {
        alert('Error occurred while purchasing the character.');
    }
  }
</script>

<h1 class="pt-5 bg-[#F8F3ED] text-[#4F3117] text-center text-2xl font-['IM_Fell_Great_Primer_SC']">
    Your wallet: <span class="font-bold">{coins}</span> Coins
</h1>

<section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-[#F8F3ED] font-['IM_Fell_Great_Primer_SC'] min-h-screen items-start auto-rows-max">
    {#each data.characters as character}
        <article class="bg-[#fbf5ec] border-4 border-[#4f311747] rounded-md flex flex-col p-6 text-center">
            <div class="flex justify-center mb-6">
                <img src={character.imageUrl} alt={character.name} class="w-32 h-32 object-contain p-2 rounded-lg bg-white border border-[#e0d3c4]"/>
            </div>
            
            <div class="flex flex-col grow mb-6 items-center">
                <h2 class="text-xl text-[#4F3117] mb-1">
                    {character.name}
                </h2>
                <p class="text-xl text-[#4F3117]">Price: {character.price} coins</p>
            </div>

            <button class="bg-[#4F3117] text-lg cursor-pointer text-[#EEE9E1] hover:bg-[#3E2612] px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-default" 
            onclick={() => buyCharacter(character.id)}
            disabled={ownedCharacterIds.includes(character.id)}>
                 {ownedCharacterIds.includes(character.id) ? 'Owned' : 'Buy'}
            </button>
        </article>
    {/each}
</section> 