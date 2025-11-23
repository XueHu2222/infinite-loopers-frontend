<script>
	function addTask() {
		alert('Add Task button clicked');
	}

	let tasks = [
		{ name: 'Read Book', end: '10/9/2025', status: 'Not Started', category: 'study' },
		{ name: 'Design', end: '10/9/2025', status: 'Not Started', category: 'study' },
		{ name: 'Clean Room', end: '12/9/2025', status: 'In Progress', category: 'housework' }
	];
</script>

<div class="min-h-screen bg-[#F8F3ED] p-4 font-serif sm:p-6">
	<h1 class="mb-4 text-center text-3xl tracking-wide text-[#4F3117] sm:mb-6 sm:text-4xl">
		Quest List
	</h1>

	<!-- Button -->
	<div class="mb-4 sm:mb-6">
		<button
			on:click={addTask}
			class="w-full rounded-xl bg-[#F5E8D9] px-3 py-2 text-xl text-[#4F3117] shadow-md hover:opacity-70 sm:px-4 sm:py-3 sm:text-2xl"
		>
			+ Add Quest
		</button>
	</div>

	<!-- Quest Table -->
	<div class="overflow-x-auto">
		<table class="w-full border-separate border-spacing-y-2 sm:border-spacing-y-4">
			<thead>
				<tr class="text-lg text-[#4F3117] sm:text-xl">
					<th class="px-2 py-2 text-left sm:px-4">Task</th>
					<th class="px-2 py-2 text-left sm:px-4">End day</th>
					<th class="px-2 py-2 text-left sm:px-4">Status</th>
					<th class="px-2 py-2 text-left sm:px-4">Category</th>
				</tr>
			</thead>

			<tbody>
				{#each tasks as task}
					<tr class="rounded-xl bg-[#F4E9D8] shadow-md">
						<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.name}</td>
						<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.end}</td>
						<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.status}</td>
						<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.category}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
