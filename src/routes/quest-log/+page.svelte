<script>
	import { onMount } from 'svelte';

	let tasks = [];
	let showModal = false;
	let currentUserId = null; 

	let form = {
		title: '',
		endDate: '',
		category: '',
		priority: 'Medium' 
	};

	async function loadTasks() {
		if (!currentUserId) return;

		try {
			console.log("Fetching tasks for User ID:", currentUserId);
			const res = await fetch(`http://localhost:3012/tasks/${currentUserId}`);
			const data = await res.json();

			if (data.success) {
				tasks = data.tasks.map((task) => ({
					title: task.title,
					end: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
					status: task.status,
					category: task.category,
					priority: task.priority 
				}));
			} else {
				console.error("Server error:", data);
			}
		} catch (err) {
			console.error('Failed to load tasks:', err);
		}
	}

	onMount(() => {
		// Get user from local storage
		const storedUser = localStorage.getItem('user'); 
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				// Handle both 'id' (database style) and 'userId' (sometimes used in stored objects)
				currentUserId = parsedUser.id || parsedUser.userId; 
				loadTasks();
			} catch (e) {
				console.error("Error parsing user data", e);
			}
		}
	});

	function addTask() {
		showModal = true;
	}

	async function submitTask() {
		if (!currentUserId) {
			alert("You must be logged in to add a task.");
			return;
		}

		const newTask = {
			title: form.title,
			endDate: form.endDate,
			category: form.category,
			priority: form.priority, 
			UserId: currentUserId    
		};

		try {
			const res = await fetch('http://localhost:3012/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTask)
			});

			const data = await res.json();

			if (data.success) {
				tasks = [
					...tasks,
					{
						title: data.task.title,
						end: data.task.endDate ? new Date(data.task.endDate).toISOString().split('T')[0] : '',
						status: data.task.status,
						category: data.task.category,
						priority: data.task.priority 
					}
				];

				showModal = false;
				form = { title: '', endDate: '', category: '', priority: 'Medium' };
			} else {
				alert(data.message || 'Failed to add task');
			}
		} catch (err) {
			console.error('Add task error:', err);
		}
	}
</script>

<div class="min-h-screen bg-[#F8F3ED] p-4 font-serif sm:p-6">
	<h1 class="mb-4 text-center text-3xl tracking-wide text-[#4F3117] sm:mb-6 sm:text-4xl">
		Quest List
	</h1>

	<!-- Add Task Button -->
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
					<th class="px-2 py-2 text-left sm:px-4">Priority</th>
					<th class="px-2 py-2 text-left sm:px-4">Status</th>
					<th class="px-2 py-2 text-left sm:px-4">Category</th>
				</tr>
			</thead>

			<tbody>
				{#if tasks.length === 0}
					<tr>
						<td colspan="5" class="text-center py-4 text-gray-500">No quests found. Add one above!</td>
					</tr>
				{:else}
					{#each tasks as task}
						<tr class="rounded-xl bg-[#F4E9D8] shadow-md">
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.title}</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.end}</td>
							
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">
								<span class={
									task.priority === 'High' ? 'text-red-600 font-bold' : 
									task.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'
								}>
									{task.priority || 'Medium'}
								</span>
							</td>

							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.status}</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.category}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<div class="fixed inset-0 flex items-center justify-center bg-black/40">
		<div class="w-80 rounded-xl bg-white p-6 shadow-lg">
			<h2 class="mb-4 font-serif text-xl text-[#4F3117]">Create New Task</h2>

			<input type="text" placeholder="Task Name" class="mb-3 w-full border p-2 rounded" bind:value={form.title} />
			<input type="date" class="mb-3 w-full border p-2 rounded" bind:value={form.endDate} />

			<label class="block text-sm mb-1 text-gray-600">Priority</label>
			<select class="mb-3 w-full border p-2 rounded" bind:value={form.priority}>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</select>

			<label class="block text-sm mb-1 text-gray-600">Category</label>
			<select class="mb-3 w-full border p-2 rounded" bind:value={form.category}>
				<option value="">Select Category</option>
				<option value="study">Study</option>
				<option value="housework">Housework</option>
				<option value="fitness">Fitness</option>
			</select>

			<div class="mt-4 flex gap-2">
				<button class="flex-1 rounded-lg bg-[#F5E8D9] py-2 text-[#4F3117]" on:click={submitTask}>
					Submit
				</button>
				<button
					class="flex-1 rounded-lg bg-gray-300 py-2 text-[#4F3117]"
					on:click={() => (showModal = false)}
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}