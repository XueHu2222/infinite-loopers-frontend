<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import logo from '$lib/assets/logo.png';

    // Your actual image imports
    import knight from '$lib/assets/achievements_knight.png';
    import mage from '$lib/assets/achievements_wizard.png';
    import medal from '$lib/assets/medal.png';
    import achievementsRectangle from '$lib/assets/achievements_rectangle.png';

    export let items = [];

    $: currentPath = $page.url.pathname;

    let user = null;
    
    // CHANGED: Real data from API instead of mock
    let achievements = [];
    let stats = {
        achievementsUnlocked: 0,
        totalAchievements: 0,
        completionRate: 0,
        totalXP: 0
    };

    onMount(async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user = JSON.parse(storedUser);
        }

        // NEW: Fetch real data
        if (user && user.id) {
            await fetchAchievements(user.id);
            await fetchStats(user.id);
        }
    });

    // NEW: Fetch achievements
    async function fetchAchievements(userId) {
        try {
            const response = await fetch(`http://localhost:3020/achievements/user/${userId}`);
            const data = await response.json();
            if (data.success) {
                achievements = data.achievements;
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    }

    // NEW: Fetch stats
    async function fetchStats(userId) {
        try {
            const response = await fetch(`http://localhost:3020/achievements/user/${userId}/stats`);
            const data = await response.json();
            if (data.success) {
                stats = data.stats;
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('user');
        user = null;
        window.location.href = '/signin';
    }
</script>

<div class="min-h-screen" style="background-color: #B5A490;">
   
    <!-- STATS BAR -->
    <div class="mx-auto max-w-7xl px-6 pb-6 pt-6">
        <div class="relative px-12 py-8 shadow-xl" 
             style="background-image: url({achievementsRectangle}); 
                    background-size: 100% 100%; 
                    background-position: center;
                    background-repeat: no-repeat;">
            <!-- Torn paper effect -->
            <div class="absolute bottom-0 left-0 right-0 h-3" 
                 style="background: linear-gradient(90deg, transparent 0%, transparent 40%, #B5A490 40%, #B5A490 60%, transparent 60%, transparent 100%); 
                        background-size: 20px 100%;"></div>
            
            <div class="grid grid-cols-3 gap-8 text-center">
                <div>
                    <div class="mb-3 font-serif text-base font-medium uppercase tracking-wider text-[#4F3117]">
                        Achievements<br />Unlocked
                    </div>
                    <div class="font-serif text-6xl font-bold text-[#3E2612]">
                        {stats.achievementsUnlocked}/{stats.totalAchievements}
                    </div>
                </div>
                <div>
                    <div class="mb-3 font-serif text-base font-medium uppercase tracking-wider text-[#4F3117]">
                        Completion<br />Rate
                    </div>
                    <div class="font-serif text-6xl font-bold text-[#3E2612]">
                        {stats.completionRate}%
                    </div>
                </div>
                <div>
                    <div class="mb-3 font-serif text-base font-medium uppercase tracking-wider text-[#4F3117]">
                        Total<br />XP
                    </div>
                    <div class="font-serif text-6xl font-bold text-[#3E2612]">
                        {stats.totalXP}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ACHIEVEMENTS SECTION -->
    <div class="pb-6" style="background-color: #E3D3BF;">
        <div class="mx-auto max-w-7xl px-6 py-6">
            <h2 class="mb-2 text-center font-serif text-5xl font-bold text-[#3E2612]">
                Achievements
            </h2>
            <p class="mb-6 text-center font-serif text-base uppercase tracking-widest text-[#4F3117]">
                Unlock badges and milestones
            </p>

            <!-- ACHIEVEMENTS  -->
            <section class="relative">
                <!-- Left Knight Character with drop-shaped background -->
                <div class="absolute left-[-250px] top-[-20px] hidden xl:block">
                    <div class="bg-[#3E3845] p-10" style="width: 520px; height: 580px; border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%; display: flex; align-items: center; justify-content: center;">
                        <img src={knight} alt="Knight" class="h-[680px]" />
                    </div>
                </div>

                <!-- Right Mage Character with drop-shaped background -->
                <div class="absolute bottom-[-20px] right-[-250px] hidden xl:block">
                    <div class="bg-[#3E3845] p-10" style="width: 520px; height: 580px; border-radius: 45% 55% 50% 50% / 55% 45% 55% 45%; display: flex; align-items: center; justify-content: center;">
                        <img src={mage} alt="Mage" class="h-[680px]" />
                    </div>
                </div>

                <div class="space-y-5">
                    <!-- Row 1 -->
                    <div class="flex justify-end gap-5">
                        {#each achievements.slice(0, 2) as ach}
                            <div class="relative aspect-square w-[380px] rounded-lg bg-[#F5EFE6] p-7 shadow-xl transition-transform hover:translate-y-[-2px]" 
                                 style="border: 5px solid #6e5c3d;">
                                
                                {#if ach.unlocked}
                                    <span class="absolute right-4 top-4 rounded-md bg-[#EEE9E1] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#3E2612]" 
                                          style="border: 2px solid #8B7355;">
                                        Unlocked
                                    </span>
                                {/if}

                                <h2 class="mb-3 font-serif text-2xl font-bold text-[#3E2612]">{ach.name}</h2>
                                <p class="mb-3 text-base leading-relaxed text-[#5C4633]">{ach.description}</p>

                                <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <span class="text-base font-semibold text-[#3E2612]">{ach.icon} {ach.points} points</span>
                                    <img src={medal} alt="Medal" class="h-34 w314" />
                                </div>
                            </div>
                        {/each}
                    </div>

                    <!-- Row 2  -->
                    <div class="flex justify-end gap-5">
                        {#each achievements.slice(2, 4) as ach}
                            <div class="relative aspect-square w-[380px] rounded-lg bg-[#F5EFE6] p-7 shadow-xl transition-transform hover:translate-y-[-2px]" 
                                 style="border: 5px solid #6e5c3d;">
                                
                                {#if ach.unlocked}
                                    <span class="absolute right-4 top-4 rounded-md bg-[#EEE9E1] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#3E2612]" 
                                          style="border: 2px solid #8B7355;">
                                        Unlocked
                                    </span>
                                {/if}

                                <h2 class="mb-3 font-serif text-2xl font-bold text-[#3E2612]">{ach.name}</h2>
                                <p class="mb-3 text-base leading-relaxed text-[#5C4633]">{ach.description}</p>

                                <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <span class="text-base font-semibold text-[#3E2612]">{ach.icon} {ach.points} points</span>
                                    <img src={medal} alt="Medal" class="h-34 w-34" />
                                </div>
                            </div>
                        {/each}
                    </div>

                    <!-- Row 3 - aligned LEFT -->
                    <div class="flex justify-start gap-5">
                        {#each achievements.slice(4, 6) as ach}
                            <div class="relative aspect-square w-[380px] rounded-lg bg-[#F5EFE6] p-7 shadow-xl transition-transform hover:translate-y-[-2px]" 
                                 style="border: 5px solid #6e5c3d;">
                                
                                {#if ach.unlocked}
                                    <span class="absolute right-4 top-4 rounded-md bg-[#EEE9E1] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#3E2612]" 
                                          style="border: 2px solid #8B7355;">
                                        Unlocked
                                    </span>
                                {/if}

                                <h2 class="mb-3 font-serif text-2xl font-bold text-[#3E2612]">{ach.name}</h2>
                                <p class="mb-3 text-base leading-relaxed text-[#5C4633]">{ach.description}</p>

                                <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <span class="text-base font-semibold text-[#3E2612]">{ach.icon} {ach.points} points</span>
                                    <img src={medal} alt="Medal" class="h-34 w-34" />
                                </div>
                            </div>
                        {/each}
                    </div>

                    <!-- Row 4 - aligned LEFT -->
                    <div class="flex justify-start gap-5">
                        {#each achievements.slice(6, 8) as ach}
                            <div class="relative aspect-square w-[380px] rounded-lg bg-[#F5EFE6] p-7 shadow-xl transition-transform hover:translate-y-[-2px]" 
                                 style="border: 5px solid #6e5c3d;">
                                
                                {#if ach.unlocked}
                                    <span class="absolute right-4 top-4 rounded-md bg-[#EEE9E1] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#3E2612]" 
                                          style="border: 2px solid #8B7355;">
                                        Unlocked
                                    </span>
                                {/if}

                                <h2 class="mb-3 font-serif text-2xl font-bold text-[#3E2612]">{ach.name}</h2>
                                <p class="mb-3 text-base leading-relaxed text-[#5C4633]">{ach.description}</p>

                                <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <span class="text-base font-semibold text-[#3E2612]">{ach.icon} {ach.points} points</span>
                                    <img src={medal} alt="Medal" class="h-34 w-34" />
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>