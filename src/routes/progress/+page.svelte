<script>
  // 1. Mock Data
  let stats = {
    totalCompleted: 34,
    completionRate: 76,
    avgPerDay: 5,
    coins: 20000,
    level: 3,
    currentXp: 180,
    maxXp: 250,
    // Chart Data
    weeklyData: [
        { day: 'Mon', completed: 6, pending: 2 },
        { day: 'Tue', completed: 8, pending: 4 },
        { day: 'Wed', completed: 10, pending: 2 },
        { day: 'Thu', completed: 12, pending: 0 },
        { day: 'Fri', completed: 10, pending: 6 },
        { day: 'Sat', completed: 8, pending: 4 },
        { day: 'Sun', completed: 10, pending: 6 }
    ],
    categories: [
        { name: 'Chores', value: 15, color: '#3E2612' }, 
        { name: 'Work', value: 12, color: '#4F3117' },   
        { name: 'Reading', value: 8, color: '#5C4B35' },  
        { name: 'Health', value: 6, color: '#8C7B65' },   
        { name: 'School', value: 18, color: '#A89F91' }   
    ],
    insights: {
        bestDay: "Thursday",
        bestDayCount: 12,
        topCategory: "School quests",
        topCategoryCount: 18,
        streak: 7
    }
  };
  
  // 2. Images 
  import coinIcon from '$lib/assets/coinbag.png'; 
  import starIcon from '$lib/assets/superstar.png'; 
  import owlImage from '$lib/assets/owl.png'; 
  import frogImage from '$lib/assets/frog.png'; 
  import parchment from '$lib/assets/review-panel.png';
  import coinSmall from '$lib/assets/coin.png';

  // 3. PIE CHART MATH LOGIC
  /**
   * @param {Array<{name: string, value: number, color: string}>} data
   */
  function getPieSlices(data) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeAngle = -90; 
    
    return data.map(item => {
      const sliceAngle = (item.value / total) * 360;
      const x1 = Math.cos(cumulativeAngle * Math.PI / 180);
      const y1 = Math.sin(cumulativeAngle * Math.PI / 180);
      const x2 = Math.cos((cumulativeAngle + sliceAngle) * Math.PI / 180);
      const y2 = Math.sin((cumulativeAngle + sliceAngle) * Math.PI / 180);
      
      const midAngle = cumulativeAngle + sliceAngle / 2;
      const labelRadius = 1.75; 
      const labelX = Math.cos(midAngle * Math.PI / 180) * labelRadius;
      const labelY = Math.sin(midAngle * Math.PI / 180) * labelRadius;

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const path = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;

      cumulativeAngle += sliceAngle;

      return { ...item, path, labelX, labelY, midAngle };
    });
  }

  let pieSlices = getPieSlices(stats.categories);
</script>

<!-- SECTION 1: TOP STATS -->
<section class="bg-[#E8DCCD] px-4 py-12 sm:px-12 lg:px-28">
  
  <h1 class="mb-12 text-center font-['IM_Fell_Great_Primer_SC'] text-3xl sm:text-5xl text-[#4F3117]">
    Your Adventure Progress
  </h1>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
    <!-- Card 1 -->
    <div class="relative flex items-center justify-center w-full max-w-[320px] mx-auto hover:-translate-y-2 transition-transform duration-300">
      <img src={parchment} alt="parchment background" class="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"/>
      <div class="absolute inset-0 flex flex-col items-center justify-center px-6 pt-4 pb-2 text-center">
        <h3 class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#5A3E1B] leading-tight">Total Completed</h3>
        <div class="font-['IM_Fell_Great_Primer_SC'] text-5xl sm:text-6xl text-[#4F3117] my-1">{stats.totalCompleted}</div>
        <p class="font-['Inter'] text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8C7B65]">This Week</p>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="relative flex items-center justify-center w-full max-w-[320px] mx-auto hover:-translate-y-2 transition-transform duration-300">
      <img src={parchment} alt="parchment background" class="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"/>
      <div class="absolute inset-0 flex flex-col items-center justify-center px-6 pt-4 pb-2 text-center">
        <h3 class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#5A3E1B] leading-tight">Completion Rate</h3>
        <div class="font-['IM_Fell_Great_Primer_SC'] text-5xl sm:text-6xl text-[#4F3117] my-1">{stats.completionRate}%</div>
        <p class="font-['Inter'] text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8C7B65]">Success Rate</p>
      </div>
    </div>
    <!-- Card 3 -->
    <div class="relative flex items-center justify-center w-full max-w-[320px] mx-auto hover:-translate-y-2 transition-transform duration-300">
      <img src={parchment} alt="parchment background" class="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"/>
      <div class="absolute inset-0 flex flex-col items-center justify-center px-6 pt-4 pb-2 text-center">
        <h3 class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#5A3E1B] leading-tight">Avg Per Day</h3>
        <div class="font-['IM_Fell_Great_Primer_SC'] text-5xl sm:text-6xl text-[#4F3117] my-1">{stats.avgPerDay}</div>
        <p class="font-['Inter'] text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8C7B65]">Quests Completed</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 2: OWL & COINS -->
<section class="bg-[#FAF6F0] px-4 py-16 sm:px-12 lg:px-28">

  <!-- ROW 2: Currency & Level -->
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-6xl mx-auto mb-20">
    <div class="flex items-center gap-4 sm:gap-6 rounded-lg border-4 border-[#5C4B35] bg-[#E0D8C8] p-4 sm:p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
      <img src={coinIcon} alt="Coins" class="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-md" />
      <div>
        <h3 class="font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl text-[#5C4B35]">Coins</h3>
        <span class="font-['IM_Fell_Great_Primer_SC'] text-4xl sm:text-5xl text-[#4F3117]">{stats.coins}</span>
      </div>
    </div>
    <div class="flex items-center gap-4 sm:gap-6 rounded-lg border-4 border-[#5C4B35] bg-[#E0D8C8] p-4 sm:p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
      <img src={starIcon} alt="Level" class="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-md" />
      <div class="w-full">
        <div class="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 class="font-['IM_Fell_Great_Primer_SC'] text-xl sm:text-2xl text-[#5C4B35]">Level {stats.level}</h3>
          <span class="font-['IM_Fell_Great_Primer_SC'] text-sm sm:text-lg text-[#6D5C45]">{stats.currentXp}/{stats.maxXp} xp</span>
        </div>
        <div class="h-4 sm:h-5 w-full overflow-hidden rounded-full border border-[#5C4B35] bg-[#FAF6F0]">
          <div class="h-full bg-[#A89F91] border-r border-[#5C4B35]" style="width: {(stats.currentXp / stats.maxXp) * 100}%"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ROW 3: Weekly Quest Completion-->
  <div class="mb-8 max-w-6xl mx-auto">
    <h2 class="text-center font-['IM_Fell_Great_Primer_SC'] text-2xl sm:text-4xl text-[#4F3117]">Weekly Quest Completion</h2>
    <p class="mb-8 text-center font-['Inter'] text-xs sm:text-base font-bold text-[#6D5C45] uppercase">Quests completed vs pending this week</p>
    
    <div class="flex flex-col items-center lg:flex-row lg:items-end lg:justify-center relative mt-8">
      <div class="relative z-10 w-48 sm:w-64 lg:w-80 lg:-mr-16 -mb-16 lg:-mb-8 order-1 lg:order-1 pointer-events-none flex justify-center">

          <div class="absolute top-4 left-4 w-3/4 h-3/4 bg-[#3E3B4B] rounded-full blur-[2px] opacity-90 scale-110"></div>
          <img src={owlImage} alt="Owl Wizard" class="relative z-10 w-full drop-shadow-2xl" />
      </div>
      
      <!-- Chart Box -->
      <div class="w-full h-80 sm:h-96 rounded-lg border-2 border-[#5C4B35] bg-[#E0D8C8] shadow-inner lg:w-2/3 order-2 lg:order-2 lg:mt-0 pt-6 pb-2 px-4 flex flex-col justify-between z-0">
         <div class="flex-1 flex items-end justify-between w-full border-b border-[#5C4B35]/20 pb-4">
            <div class="flex flex-col justify-between h-full text-xs font-['Inter'] text-[#6D5C45] pr-2 border-r border-[#5C4B35]/30">
                <span>12-</span><span>10-</span><span>8-</span><span>6-</span><span>4-</span><span>2-</span><span>0-</span>
            </div>
            {#each stats.weeklyData as data}
                <div class="flex flex-col items-center justify-end h-full w-full mx-1">
                    <div class="flex items-end gap-1 h-full w-full justify-center">
                        <div class="w-4 sm:w-6 bg-[#B5AFA2] rounded-t-sm transition-all hover:opacity-80 border-t border-l border-r border-[#5C4B35]/20" style="height: {(data.completed / 12) * 80}%"></div>
                        <div class="w-4 sm:w-6 bg-[#4F3117] rounded-t-sm transition-all hover:opacity-80" style="height: {(data.pending / 12) * 80}%"></div>
                    </div>
                    <span class="mt-2 text-[10px] sm:text-xs font-['IM_Fell_Great_Primer_SC'] text-[#4F3117] uppercase tracking-widest">{data.day}</span>
                </div>
            {/each}
         </div>

         <div class="flex justify-center gap-8 pt-4">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-[#B5AFA2] border border-[#5C4B35]/30 rounded-sm"></div>
                <span class="font-['IM_Fell_Great_Primer_SC'] text-xs sm:text-sm text-[#4F3117] uppercase">Completed</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-[#4F3117] rounded-sm"></div>
                <span class="font-['IM_Fell_Great_Primer_SC'] text-xs sm:text-sm text-[#4F3117] uppercase">Pending</span>
            </div>
         </div>
      </div>
    </div> 
  </div>
</section>

<!-- SECTION 3: FROG -->
<section class="bg-[#E8DCCD] px-4 py-16 sm:px-12 lg:px-28">
  
  <div class="max-w-6xl mx-auto">
    <h2 class="text-center font-['IM_Fell_Great_Primer_SC'] text-2xl sm:text-4xl text-[#4F3117]">Quests By Category</h2>
    <p class="mb-8 text-center font-['Inter'] text-xs sm:text-base font-bold text-[#6D5C45] uppercase">Distribution of completed quests</p>

    <div class="flex flex-col items-center lg:flex-row lg:items-end lg:justify-center relative mt-8">
      <div class="relative z-10 w-48 sm:w-64 lg:w-80 lg:-ml-16 -mb-16 lg:-mb-8 order-1 lg:order-2 pointer-events-none flex justify-center">
        
          <div class="absolute top-8 right-4 w-3/4 h-3/4 bg-[#8C7B65] rounded-full blur-[2px] opacity-90 scale-110"></div>
          <img src={frogImage} alt="Frog Traveler" class="relative z-10 w-full drop-shadow-2xl" />
      </div>

      <!-- PIE CHART BOX -->
      <div class="w-full h-80 sm:h-96 rounded-lg border-2 border-[#5C4B35] bg-[#FAF6F0] shadow-inner lg:w-2/3 order-2 lg:order-1 lg:mt-0 flex items-center justify-center p-4 overflow-visible relative z-0">
          <svg viewBox="-2.2 -2.2 4.4 4.4" class="w-full h-full max-w-[500px] overflow-visible">
            {#each pieSlices as slice}
              <path d={slice.path} fill={slice.color} stroke="#FAF6F0" stroke-width="0.02" />
            {/each}
            {#each pieSlices as slice}
              <text 
                x={slice.labelX} 
                y={slice.labelY} 
                text-anchor="middle" 
                dominant-baseline="middle"
                class="font-['IM_Fell_Great_Primer_SC'] text-[0.22px] fill-[#4F3117] uppercase"
              >
                {slice.name}: {slice.value}
              </text>
              <line 
                x1={Math.cos(slice.midAngle * Math.PI / 180) * 0.95} 
                y1={Math.sin(slice.midAngle * Math.PI / 180) * 0.95}
                x2={Math.cos(slice.midAngle * Math.PI / 180) * 1.55} 
                y2={Math.sin(slice.midAngle * Math.PI / 180) * 1.55}
                stroke="#5C4B35"
                stroke-width="0.015"
                opacity="0.5"
              />
            {/each}
          </svg>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 4: INSIGHTS -->
<section class="bg-[#FAF6F0] px-4 py-16 sm:px-12 lg:px-28">
  
  <div class="max-w-4xl mx-auto">
    <h2 class="text-center font-['IM_Fell_Great_Primer_SC'] text-2xl sm:text-4xl text-[#4F3117]">Weekly Insights</h2>
    <p class="mb-8 text-center font-['Inter'] text-xs sm:text-base font-bold text-[#6D5C45] uppercase">FROM YOUR BEST DAYS TO YOUR GREATEST ACHIEVEMENTS</p>

    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4 rounded-lg border-2 border-[#5C4B35] bg-[#E0D8C8] p-4 sm:px-8 sm:py-6 shadow-md">
             <img src={coinSmall} alt="coin" class="w-8 h-8 sm:w-10 sm:h-10" />
             <div class="flex flex-col">
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#4F3117]">Best Day</span>
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-base sm:text-lg text-[#5C4B35]">{stats.insights.bestDay} with {stats.insights.bestDayCount} quests completed</span>
             </div>
        </div>
        <div class="flex items-center gap-4 rounded-lg border-2 border-[#5C4B35] bg-[#E0D8C8] p-4 sm:px-8 sm:py-6 shadow-md">
             <img src={coinSmall} alt="coin" class="w-8 h-8 sm:w-10 sm:h-10" />
             <div class="flex flex-col">
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#4F3117]">Top Category</span>
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-base sm:text-lg text-[#5C4B35]">{stats.insights.topCategory} ( {stats.insights.topCategoryCount} completed )</span>
             </div>
        </div>
        <div class="flex items-center gap-4 rounded-lg border-2 border-[#5C4B35] bg-[#E0D8C8] p-4 sm:px-8 sm:py-6 shadow-md">
             <img src={coinSmall} alt="coin" class="w-8 h-8 sm:w-10 sm:h-10" />
             <div class="flex flex-col">
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-lg sm:text-xl text-[#4F3117]">Current Streak</span>
                 <span class="font-['IM_Fell_Great_Primer_SC'] text-base sm:text-lg text-[#5C4B35]">{stats.insights.streak} days of consistent work</span>
             </div>
        </div>
    </div>
  </div>
</section>