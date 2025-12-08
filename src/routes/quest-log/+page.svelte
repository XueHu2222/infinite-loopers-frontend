<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	/**
	 * @type { any[]}
	 */
	let tasks = [];

	/** @type {any[]} */
	let sortedTasks = [];

	let showModal = false;
	let sortByPriority = 'none';
	let sortByDate = 'none';
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
			const res = await fetch(`http://localhost:3011/tasks/${userId}`);
			// const res = await fetch(`http://localhost:3010/tasks/${userId}`);
			const data = await res.json();

			if (data.success) {
				tasks = data.tasks.map((/** @type {any} */ task) => ({
					title: task.title,
					end: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
					status: task.status,
					category: task.category,
					priority: task.priority
				}));
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

		// If no sorting is applied, just return filtered tasks
		if (sortByPriority === 'none' && sortByDate === 'none') {
			sortedTasks = filteredTasks;
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
				if (sortByPriority === 'high-to-low') {
					priorityDiff = bPriority - aPriority;
				} else {
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

				if (sortByDate === 'newest-first') {
					return bDate - aDate;
				} else {
					return aDate - bDate;
				}
			}

			return 0;
		});
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

		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
			<div class="flex items-center gap-2">
				<label for="filter-category" class="text-base text-[#4F3117] sm:text-lg"
					>Filter by Category:</label
				>
				<select
					id="filter-category"
					bind:value={filterByCategory}
					class="rounded-lg border border-[#4F3117] bg-white px-3 py-2 text-base text-[#4F3117] shadow-sm focus:ring-2 focus:ring-[#4F3117] focus:outline-none sm:px-4 sm:py-2 sm:text-lg"
				>
					<option value="all">All</option>
					<option value="study">Study</option>
					<option value="housework">Housework</option>
					<option value="fitness">Fitness</option>
				</select>
			</div>

			<div class="flex items-center gap-2">
				<label for="sort-priority" class="text-base text-[#4F3117] sm:text-lg"
					>Sort by Priority:</label
				>
				<select
					id="sort-priority"
					bind:value={sortByPriority}
					class="rounded-lg border border-[#4F3117] bg-white px-3 py-2 text-base text-[#4F3117] shadow-sm focus:ring-2 focus:ring-[#4F3117] focus:outline-none sm:px-4 sm:py-2 sm:text-lg"
				>
					<option value="none">None</option>
					<option value="high-to-low">High to Low</option>
					<option value="low-to-high">Low to High</option>
				</select>
			</div>

			<div class="flex items-center gap-2">
				<label for="sort-date" class="text-base text-[#4F3117] sm:text-lg">Sort by Date:</label>
				<select
					id="sort-date"
					bind:value={sortByDate}
					class="rounded-lg border border-[#4F3117] bg-white px-3 py-2 text-base text-[#4F3117] shadow-sm focus:ring-2 focus:ring-[#4F3117] focus:outline-none sm:px-4 sm:py-2 sm:text-lg"
				>
					<option value="none">None</option>
					<option value="newest-first">Newest First</option>
					<option value="oldest-first">Oldest First</option>
				</select>
			</div>
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
				</tr>
			</thead>

			<tbody>
				{#if sortedTasks.length === 0}
					<tr>
						<td colspan="5" class="py-4 text-center text-gray-500"
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
