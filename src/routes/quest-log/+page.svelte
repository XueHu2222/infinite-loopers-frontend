<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	/**
	 * @type { any[]}
	 */
	let tasks = [];

	/** @type {any[]} */
	let sortedTasks = [];

	/** @type {any[]} */
	let originalTasksOrder = [];

	let showModal = false;
	let sortByPriority = 'none'; // 'none' | 'asc' | 'desc'
	let sortByDate = 'none'; // 'none' | 'asc' | 'desc'
	let filterByCategory = 'all';
	let searchQuery = '';

	let form = {
		title: '',
		endDate: '',
		category: '',
		priority: 'Medium'
	};

	/**
	 * @type {null}
	 */
	let userId = null;
	let email = '';
	let error = '';

	onMount(async () => {
		const storedUser = localStorage.getItem('user');

		if (!storedUser) {
			error = 'No user found, please login first.';
			return;
		}

		const user = JSON.parse(storedUser);
		email = user.email;
		userId = user.id;

		const tempForm = sessionStorage.getItem('tempForm');
		const selectedDate = sessionStorage.getItem('selectedDate');
		const isSelectingDate = sessionStorage.getItem('isSelectingDate') === 'true';

		if (tempForm) {
			form = JSON.parse(tempForm);
			if (isSelectingDate) {
				if (selectedDate) form.endDate = selectedDate;
				showModal = true;
			}
			sessionStorage.removeItem('tempForm');
			sessionStorage.removeItem('isSelectingDate');
			sessionStorage.removeItem('selectedDate');
		}

		await loadTasks();
	});

	async function loadTasks() {
		if (!userId) return;

		try {
			const res = await fetch(`http://localhost:3010/tasks/${userId}`);
			// const res = await fetch(`http://localhost:3010/tasks/${userId}`);
			const data = await res.json();

			if (data.success) {
				tasks = data.tasks.map((/** @type {any} */ task, index) => ({
					id: task.id,
					title: task.title,
					end: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
					status: task.status,
					category: task.category,
					priority: task.priority,
					originalIndex: index, // Store original order
					createdAt: task.createdAt || task.created_at || new Date().getTime() // Use createdAt if available, otherwise use current time
				}));
				// Store original order
				originalTasksOrder = [...tasks];
				sortTasks();
			} else {
				error = data.message;
			}
		} catch (err) {
			console.error(err);
			error = 'Failed to load tasks';
		}
	}

	function addTask() {
		showModal = true;
	}

	function openCalendar() {
		sessionStorage.setItem('tempForm', JSON.stringify(form));
		sessionStorage.setItem('isSelectingDate', 'true');

		goto('/calendar');
	}

	function sortTasks() {
		// First, filter by search query
		let filteredTasks = tasks;
		if (searchQuery.trim() !== '') {
			const query = searchQuery.toLowerCase().trim();
			filteredTasks = filteredTasks.filter((/** @type {any} */ task) =>
				task.title.toLowerCase().includes(query)
			);
		}

		// Then, filter by category
		if (filterByCategory !== 'all') {
			filteredTasks = filteredTasks.filter(
				(/** @type {any} */ task) => task.category === filterByCategory
			);
		}

		// If no sorting is applied, restore original order (by time added)
		if (sortByPriority === 'none' && sortByDate === 'none') {
			// Sort by original index or createdAt to restore original order
			sortedTasks = [...filteredTasks].sort((/** @type {any} */ a, /** @type {any} */ b) => {
				if (a.originalIndex !== undefined && b.originalIndex !== undefined) {
					return a.originalIndex - b.originalIndex;
				}
				// Fallback to createdAt if available
				const aTime = a.createdAt || 0;
				const bTime = b.createdAt || 0;
				return aTime - bTime;
			});
			return;
		}

		/** @type {{ [key: string]: number }} */
		const priorityOrder = { High: 3, Medium: 2, Low: 1 };

		sortedTasks = [...filteredTasks].sort((/** @type {any} */ a, /** @type {any} */ b) => {
			// Priority sorting
			if (sortByPriority !== 'none') {
				const aPriorityValue = a.priority || 'Medium';
				const bPriorityValue = b.priority || 'Medium';
				const aPriority = priorityOrder[aPriorityValue] || 2;
				const bPriority = priorityOrder[bPriorityValue] || 2;

				let priorityDiff = 0;
				if (sortByPriority === 'desc') {
					priorityDiff = bPriority - aPriority;
				} else if (sortByPriority === 'asc') {
					priorityDiff = aPriority - bPriority;
				}

				// If priorities are different, return the difference
				if (priorityDiff !== 0) {
					return priorityDiff;
				}
			}

			// Date sorting (as secondary sort or primary if priority is none)
			if (sortByDate !== 'none') {
				const aDate = a.end ? new Date(a.end).getTime() : 0;
				const bDate = b.end ? new Date(b.end).getTime() : 0;

				// Handle empty dates - put them at the end
				if (!a.end && !b.end) return 0;
				if (!a.end) return 1;
				if (!b.end) return -1;

				if (sortByDate === 'desc') {
					return bDate - aDate;
				} else if (sortByDate === 'asc') {
					return aDate - bDate;
				}
			}

			return 0;
		});
	}

	function toggleSortPriority() {
		if (sortByPriority === 'none') {
			sortByPriority = 'asc';
		} else if (sortByPriority === 'asc') {
			sortByPriority = 'desc';
		} else {
			sortByPriority = 'none';
		}
		// Reactive statement will automatically call sortTasks()
	}

	function toggleSortDate() {
		if (sortByDate === 'none') {
			sortByDate = 'asc';
		} else if (sortByDate === 'asc') {
			sortByDate = 'desc';
		} else {
			sortByDate = 'none';
		}
		// Reactive statement will automatically call sortTasks()
	}

	$: if (tasks.length > 0 || sortByPriority || sortByDate || filterByCategory || searchQuery) {
		sortTasks();
	}

	async function submitTask() {
		if (!userId) return;

		const newTask = { ...form, userId };

		try {
			const res = await fetch(`http://localhost:3011/tasks/${userId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTask)
			});

			// try {
			// 	const res = await fetch(`http://localhost:3010/tasks/${userId}`, {
			// 		method: "POST",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify(newTask)
			// 	});

			const data = await res.json();

			if (data.success) {
				const newTask = {
					id: data.task.id,
					title: data.task.title,
					end: data.task.endDate ? new Date(data.task.endDate).toISOString().split('T')[0] : '',
					status: data.task.status,
					category: data.task.category,
					priority: data.task.priority,
					originalIndex: tasks.length, // New task gets last index
					createdAt: data.task.createdAt || data.task.created_at || new Date().getTime()
				};
				tasks = [...tasks, newTask];
				originalTasksOrder = [...tasks];
				sortTasks();

				showModal = false;

				form = {
					title: '',
					endDate: '',
					category: '',
					priority: 'Medium'
				};
			} else {
				alert(data.message || 'Failed to add task');
			}
		} catch (err) {
			console.error(err);
		}
	}
	// @ts-ignore
	async function completeTask(taskId) {
		try {
			const res = await fetch(`http://localhost:3010/tasks/${taskId}/complete`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await res.json();

			if (data.success) {
				// Show unlocked achievements if any
				if (data.unlockedAchievements && data.unlockedAchievements.length > 0) {
					// @ts-ignore
					const achievementNames = data.unlockedAchievements.map((a) => a.name).join(', ');
					alert(`🎉 Achievement unlocked: ${achievementNames}!`);
				}

				// Reload tasks
				await loadTasks();
			} else {
				alert(data.message || 'Failed to complete task');
			}
		} catch (err) {
			console.error(err);
			alert('Failed to complete task');
		}
	}
</script>

<div class="min-h-screen bg-[#F8F3ED] p-4 font-serif sm:p-6">
	<h1 class="mb-4 text-center text-3xl tracking-wide text-[#4F3117] sm:mb-6 sm:text-4xl">
		Quest List
	</h1>

	<!-- Search Bar -->
	<div class="mb-4 sm:mb-6">
		<input
			type="text"
			placeholder="Search tasks by name..."
			bind:value={searchQuery}
			class="w-full rounded-lg border border-[#4F3117] bg-white px-3 py-2 text-base text-[#4F3117] shadow-sm focus:ring-2 focus:ring-[#4F3117] focus:outline-none sm:px-4 sm:py-2 sm:text-lg"
		/>
	</div>

	<!-- Add Task Button and Sort Dropdown -->
	<div class="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
		<button
			on:click={addTask}
			class="w-full rounded-xl bg-[#F5E8D9] px-3 py-2 text-xl text-[#4F3117] shadow-md hover:opacity-70 sm:w-auto sm:px-4 sm:py-3 sm:text-2xl"
		>
			+ Add Quest
		</button>

		<!-- Interactive Filter Buttons -->
		<div class="flex flex-wrap items-center gap-3">
			<!-- Category Filter -->
			<div class="flex flex-wrap gap-2">
				<button
					on:click={() => (filterByCategory = 'all')}
					class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {filterByCategory === 'all'
						? 'border-[#4F3117] bg-[#4F3117] text-white shadow-md'
						: 'border-[#4F3117] bg-white text-[#4F3117] hover:bg-[#F5E8D9]'}"
				>
					All Categories
				</button>
				<button
					on:click={() => (filterByCategory = 'study')}
					class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {filterByCategory === 'study'
						? 'border-[#4F3117] bg-[#4F3117] text-white shadow-md'
						: 'border-[#4F3117] bg-white text-[#4F3117] hover:bg-[#F5E8D9]'}"
				>
					Study
				</button>
				<button
					on:click={() => (filterByCategory = 'housework')}
					class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {filterByCategory === 'housework'
						? 'border-[#4F3117] bg-[#4F3117] text-white shadow-md'
						: 'border-[#4F3117] bg-white text-[#4F3117] hover:bg-[#F5E8D9]'}"
				>
					Housework
				</button>
				<button
					on:click={() => (filterByCategory = 'fitness')}
					class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {filterByCategory === 'fitness'
						? 'border-[#4F3117] bg-[#4F3117] text-white shadow-md'
						: 'border-[#4F3117] bg-white text-[#4F3117] hover:bg-[#F5E8D9]'}"
				>
					Fitness
				</button>
			</div>

			<!-- Sort by Priority Button -->
			<button
				on:click={toggleSortPriority}
				class="flex items-center gap-2 rounded-lg border-2 border-[#4F3117] bg-white px-4 py-2 text-sm font-medium text-[#4F3117] transition-all hover:bg-[#F5E8D9] hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {sortByPriority !== 'none'
					? 'bg-[#F5E8D9] shadow-md'
					: ''}"
			>
				<span>Priority</span>
				{#if sortByPriority === 'asc'}
					<span class="text-lg">↑</span>
				{:else if sortByPriority === 'desc'}
					<span class="text-lg">↓</span>
				{:else}
					<span class="text-gray-400">⇅</span>
				{/if}
			</button>

			<!-- Sort by Date Button -->
			<button
				on:click={toggleSortDate}
				class="flex items-center gap-2 rounded-lg border-2 border-[#4F3117] bg-white px-4 py-2 text-sm font-medium text-[#4F3117] transition-all hover:bg-[#F5E8D9] hover:opacity-80 sm:px-5 sm:py-2.5 sm:text-base {sortByDate !== 'none'
					? 'bg-[#F5E8D9] shadow-md'
					: ''}"
			>
				<span>Date</span>
				{#if sortByDate === 'asc'}
					<span class="text-lg">↑</span>
				{:else if sortByDate === 'desc'}
					<span class="text-lg">↓</span>
				{:else}
					<span class="text-gray-400">⇅</span>
				{/if}
			</button>
		</div>
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
					<th class="px-2 py-2 text-left sm:px-4">Actions</th>
				</tr>
			</thead>

			<tbody>
				{#if sortedTasks.length === 0}
					<tr>
						<td colspan="6" class="py-4 text-center text-gray-500"
							>No quests found. Add one above!</td
						>
					</tr>
				{:else}
					{#each sortedTasks as task}
						<tr class="rounded-xl bg-[#F4E9D8] shadow-md">
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.title}</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.end}</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">
								<span
									class={task.priority === 'High'
										? 'font-bold text-red-600'
										: task.priority === 'Medium'
											? 'text-orange-600'
											: 'text-green-600'}
								>
									{task.priority || 'Medium'}
								</span>
							</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.status}</td>
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">{task.category}</td>
							<!-- ADD THIS ENTIRE <td> BLOCK -->
							<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">
								{#if task.status !== 'Completed'}
									<button
										on:click={() => completeTask(task.id)}
										class="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
									>
										✓ Complete
									</button>
								{:else}
									<span class="text-green-600">✓ Done</span>
								{/if}
							</td>
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

			<input
				type="text"
				placeholder="Task Name"
				class="mb-3 w-full rounded border p-2"
				bind:value={form.title}
			/>
			<button
				type="button"
				on:click={openCalendar}
				class="mb-3 flex w-full items-center justify-between rounded border p-2 text-left text-gray-700"
			>
				<span>{form.endDate || 'Pick a date'}</span>
				<span>📅</span>
			</button>

			<label for="priority" class="mb-1 block text-sm text-gray-600">Priority</label>
			<select id="priority" class="mb-3 w-full rounded border p-2" bind:value={form.priority}>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</select>

			<label for="category" class="mb-1 block text-sm text-gray-600">Category</label>
			<select id="category" class="mb-3 w-full rounded border p-2" bind:value={form.category}>
				<option value="">Select Category</option>
				<option value="Study">Study</option>
				<option value="Work">Work</option>
				<option value="Chores">Chores</option>
				<option value="Health">Health</option>
				<option value="Reading">Reading</option>
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
