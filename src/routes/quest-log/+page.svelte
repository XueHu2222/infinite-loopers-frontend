<script>
	import { openModal } from '../../modalStore.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let tasks = [];
	let sortedTasks = [];
	let originalTasksOrder = [];

	let showModal = false;
	let showDetailModal = false;
	let selectedTask = null;
	let sortByPriority = 'none'; // 'none' | 'asc' | 'desc'
	let sortByDate = 'none'; // 'none' | 'asc' | 'desc'
	let filterByCategory = 'all';
	let searchQuery = '';
	let formError = '';

	let form = { title: '', endDate: '', category: '', priority: 'Medium' };
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
			if (isSelectingDate && selectedDate) form.endDate = selectedDate;
			showModal = isSelectingDate;
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
			const data = await res.json();
			if (data.success) {
				tasks = data.tasks.map((task, index) => ({
					id: task.id,
					title: task.title,
					end: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
					status: task.status,
					category: task.category,
					priority: task.priority,
					originalIndex: index,
					createdAt: task.createdAt || task.created_at || new Date().getTime(),
					notes: task.notes || '',
					suggestions: task.suggestions || '',
					subtasks: task.subtasks || []
				}));
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
		let filtered = tasks.filter(
			(t) =>
				t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
				(filterByCategory === 'all' || t.category.toLowerCase() === filterByCategory.toLowerCase())
		);

		if (sortByPriority === 'none' && sortByDate === 'none') {
			sortedTasks = [...filtered].sort((a, b) => (a.originalIndex ?? 0) - (b.originalIndex ?? 0));
			return;
		}

		const priorityOrder = { High: 3, Medium: 2, Low: 1 };

		sortedTasks = [...filtered].sort((a, b) => {
			if (sortByPriority !== 'none') {
				const diff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
				if (diff !== 0) return sortByPriority === 'asc' ? diff : -diff;
			}
			if (sortByDate !== 'none') {
				const aTime = a.end ? new Date(a.end).getTime() : 0;
				const bTime = b.end ? new Date(b.end).getTime() : 0;
				return sortByDate === 'asc' ? aTime - bTime : bTime - aTime;
			}
			return 0;
		});
	}

	function toggleSortPriority() {
		sortByPriority = sortByPriority === 'none' ? 'asc' : sortByPriority === 'asc' ? 'desc' : 'none';
	}
	function toggleSortDate() {
		sortByDate = sortByDate === 'none' ? 'asc' : sortByDate === 'asc' ? 'desc' : 'none';
	}

	$: if (tasks.length || sortByPriority || sortByDate || filterByCategory || searchQuery)
		sortTasks();

	async function submitTask() {
		formError = '';
		if (!form.title.trim()) {
			formError = 'Task name is required';
			return;
		}
		if (!userId) return;

		try {
			const res = await fetch(`http://localhost:3011/tasks/${userId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, userId })
			});
			const data = await res.json();
			if (data.success) {
				const newT = {
					id: data.task.id,
					title: data.task.title,
					end: data.task.endDate ? new Date(data.task.endDate).toISOString().split('T')[0] : '',
					status: data.task.status,
					category: data.task.category,
					priority: data.task.priority,
					originalIndex: tasks.length,
					createdAt: data.task.createdAt || data.task.created_at || new Date().getTime(),
					notes: data.task.notes || '',
					suggestions: data.task.suggestions || '',
					subtasks: data.task.subtasks || []
				};
				tasks = [...tasks, newT];
				originalTasksOrder = [...tasks];
				sortTasks();
				showModal = false;
				form = { title: '', endDate: '', category: '', priority: 'Medium' };
			} else {
				openModal(data.message || 'Failed to add task', 'error');
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function completeTask(taskId) {
		try {
			const res = await fetch(`http://localhost:3010/tasks/${taskId}/complete`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();
			if (data.success) {
				if (data.unlockedAchievements?.length > 0) {
					openModal(
						`🎉 Achievement unlocked: ${data.unlockedAchievements.map((a) => a.name).join(', ')}!`,
						'success'
					);
				}
				await loadTasks();
			} else {
				openModal(data.message || 'Failed to complete task', 'error');
			}
		} catch (err) {
			console.error(err);
			openModal('Failed to complete task', 'error');
		}
	}

	function openDetailModal(task) {
		selectedTask = {
			...task,
			notes: task.notes || '',
			suggestions: task.suggestions || '',
			subtasks: [...(task.subtasks || [])]
		};
		showDetailModal = true;
	}
	function closeDetailModal() {
		showDetailModal = false;
		selectedTask = null;
	}
	function addSubtask() {
		if (!selectedTask) return;
		selectedTask.subtasks = [
			...(selectedTask.subtasks || []),
			{ id: Date.now(), text: '', completed: false }
		];
		selectedTask = { ...selectedTask };
	}
	function removeSubtask(id) {
		if (!selectedTask) return;
		selectedTask.subtasks = selectedTask.subtasks.filter((st) => st.id !== id);
		selectedTask = { ...selectedTask };
	}
	function toggleSubtask(id) {
		if (!selectedTask) return;
		selectedTask.subtasks = selectedTask.subtasks.map((st) =>
			st.id === id ? { ...st, completed: !st.completed } : st
		);
		selectedTask = { ...selectedTask };
	}

	async function saveTaskDetails() {
		if (!selectedTask || !userId) return;
		try {
			const res = await fetch(`http://localhost:3010/tasks/${selectedTask.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					notes: selectedTask.notes,
					suggestions: selectedTask.suggestions,
					subtasks: selectedTask.subtasks
				})
			});
			const data = await res.json();
			if (data.success) {
				const i = tasks.findIndex((t) => t.id === selectedTask.id);
				if (i !== -1) {
					tasks[i] = {
						...tasks[i],
						notes: selectedTask.notes,
						suggestions: selectedTask.suggestions,
						subtasks: selectedTask.subtasks
					};
					tasks = [...tasks];
					sortTasks();
				}
				closeDetailModal();
			} else {
				alert(data.message || 'Failed to save task details');
			}
		} catch (err) {
			console.error(err);
			alert('Failed to save task details');
		}
	}
</script>

<div class="min-h-screen bg-[#F8F3ED] p-4 font-serif sm:p-6">
	<h1 class="mb-4 text-center text-2xl tracking-wide text-[#4F3117] sm:text-3xl md:text-4xl">
		Quest List
	</h1>

	<!-- Search -->
	<div class="mb-4 sm:mb-6">
		<input
			type="text"
			placeholder="Search tasks by name..."
			bind:value={searchQuery}
			class="w-full rounded-lg border border-[#4F3117] bg-white px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-[#4F3117] focus:outline-none sm:px-4 sm:py-2 sm:text-lg"
		/>
	</div>

	<!-- Add + Filter + Sort -->
	<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<button
			on:click={addTask}
			class="w-full rounded-xl bg-[#F5E8D9] px-3 py-2 text-xl text-[#4F3117] shadow-md hover:opacity-70 sm:w-auto sm:px-4 sm:py-3 sm:text-2xl"
			>+ Add Quest</button
		>

		<div class="flex flex-wrap items-center gap-2 sm:gap-3">
			<!-- Category -->
			<div class="flex flex-wrap gap-2">
				{#each ['all', 'study', 'housework', 'fitness'] as cat}
					<button
						on:click={() => (filterByCategory = cat)}
						class="rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all sm:px-4 sm:py-2 sm:text-base {filterByCategory ===
						cat
							? 'border-[#4F3117] bg-[#4F3117] text-white shadow-md'
							: 'border-[#4F3117] bg-white text-[#4F3117] hover:bg-[#F5E8D9]'}"
						>{cat[0].toUpperCase() + cat.slice(1)}</button
					>
				{/each}
			</div>

			<!-- Sort -->
			<button
				on:click={toggleSortPriority}
				class="flex flex-1 items-center gap-1 rounded-lg border-2 border-[#4F3117] bg-white px-2 py-1 text-sm text-[#4F3117] transition-all hover:bg-[#F5E8D9] hover:opacity-80 sm:flex-auto sm:px-4 sm:py-2 sm:text-base {sortByPriority !==
				'none'
					? 'bg-[#F5E8D9] shadow-md'
					: ''}"
				>Priority {sortByPriority === 'asc' ? '↑' : sortByPriority === 'desc' ? '↓' : '⇅'}</button
			>
			<button
				on:click={toggleSortDate}
				class="flex flex-1 items-center gap-1 rounded-lg border-2 border-[#4F3117] bg-white px-2 py-1 text-sm text-[#4F3117] transition-all hover:bg-[#F5E8D9] hover:opacity-80 sm:flex-auto sm:px-4 sm:py-2 sm:text-base {sortByDate !==
				'none'
					? 'bg-[#F5E8D9] shadow-md'
					: ''}">Date {sortByDate === 'asc' ? '↑' : sortByDate === 'desc' ? '↓' : '⇅'}</button
			>
		</div>
	</div>
	<!-- desktop -->
	<div class="hidden overflow-x-auto sm:block">
		<table class="w-full border-separate border-spacing-y-2 sm:border-spacing-y-4">
			<thead>
				<tr class="text-lg text-[#4F3117] sm:text-xl">
					<th class="px-2 py-2 text-left sm:px-4">Quest</th>
					<th class="px-2 py-2 text-left sm:px-4">End day</th>
					<th class="px-2 py-2 text-left sm:px-4">Priority</th>
					<th class="px-2 py-2 text-left sm:px-4">Status</th>
					<th class="px-2 py-2 text-left sm:px-4">Category</th>
					<th class="px-2 py-2 text-left sm:px-4">Actions</th>
				</tr>
			</thead>
			<tbody>
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
						<td class="px-2 py-2 text-base sm:px-4 sm:py-3 sm:text-xl">
							<div class="flex flex-wrap items-center gap-2">
								<button
									on:click={() => openDetailModal(task)}
									class="rounded bg-[#4F3117] px-3 py-1 text-sm text-white hover:bg-[#3E2612]"
									>Details</button
								>
								{#if task.status !== 'Completed'}
									<button
										on:click={() => completeTask(task.id)}
										class="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
										>✓ Complete</button
									>
								{:else}
									<span class="text-sm text-green-600">✓ Done</span>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- mobile -->
	<div class="flex flex-col gap-4 sm:hidden">
		{#each sortedTasks as task}
			<div class="rounded-xl bg-[#F4E9D8] p-4 shadow-md">
				<div class="mb-2 flex items-center justify-between">
					<h3 class="text-lg font-semibold">{task.title}</h3>
					<span
						class={task.priority === 'High'
							? 'text-red-600'
							: task.priority === 'Medium'
								? 'text-orange-600'
								: 'text-green-600'}
					>
						{task.priority || 'Medium'}
					</span>
				</div>
				<p class="text-sm text-gray-700">End: {task.end}</p>
				<p class="text-sm text-gray-700">Status: {task.status}</p>
				<p class="text-sm text-gray-700">Category: {task.category}</p>
				<div class="mt-2 flex flex-wrap gap-2">
					<button
						on:click={() => openDetailModal(task)}
						class="rounded bg-[#4F3117] px-3 py-1 text-sm text-white hover:bg-[#3E2612]"
						>Details</button
					>
					{#if task.status !== 'Completed'}
						<button
							on:click={() => completeTask(task.id)}
							class="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
							>✓ Complete</button
						>
					{:else}
						<span class="text-sm text-green-600">✓ Done</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
		<div
			class="w-full max-w-[90vw] overflow-hidden rounded-xl border-6 border-double border-[#ad8a6c] bg-[#fdf3e7] font-['IM_Fell_Great_Primer_SC'] shadow-[0_0_20px_rgba(0,0,0,0.5)] md:w-[520px]"
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between border-b-2 border-[#ad8a6c] px-4 py-3 text-[#4F3117]"
			>
				<h2 class="text-xl sm:text-2xl">Create New Task</h2>
				<button
					on:click={() => (showModal = false)}
					class="text-xl transition-transform hover:rotate-12">✖</button
				>
			</div>
			<!-- Content -->
			<div class="space-y-3 p-4 text-[#4F3117] sm:space-y-4 sm:p-6">
				<input
					type="text"
					placeholder="Task Name"
					bind:value={form.title}
					class="w-full rounded border-2 bg-[#fff8e1] p-2 text-base focus:outline-none sm:text-lg {formError
						? 'border-red-600 focus:ring-2 focus:ring-red-400'
						: 'border-[#ad8a6c] focus:ring-2 focus:ring-[#ad8a6c]'}"
				/>
				{#if formError}<p class="text-sm text-red-600">{formError}</p>{/if}
				<button
					type="button"
					on:click={openCalendar}
					class="flex w-full justify-between rounded border-2 border-[#ad8a6c] bg-[#fff8e1] p-2 text-base hover:bg-[#f1e0c5] sm:p-3 sm:text-lg"
					>{form.endDate || 'Pick a date'} <span>📅</span></button
				>
				<div>
					<label class="mb-1 block text-sm">Priority</label>
					<select
						bind:value={form.priority}
						class="w-full rounded border-2 bg-[#fff8e1] p-2 text-base sm:text-lg"
					>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>
				<div>
					<label class="mb-1 block text-sm">Category</label>
					<select
						bind:value={form.category}
						class="w-full rounded border-2 bg-[#fff8e1] p-2 text-base sm:text-lg"
					>
						<option value="">Select Category</option>
						<option value="Study">Study</option>
						<option value="Work">Work</option>
						<option value="Chores">Chores</option>
						<option value="Health">Health</option>
						<option value="Reading">Reading</option>
					</select>
				</div>
				<div class="mt-4 flex flex-col gap-3 sm:flex-row">
					<button
						class="flex-1 rounded-lg border-2 border-[#ad8a6c] bg-[#fff8e1] py-2 text-lg hover:bg-[#f1e0c5] sm:text-base"
						on:click={submitTask}>Submit</button
					>
					<button
						class="flex-1 rounded-lg border-2 border-[#ad8a6c] bg-[#e0d3c2] py-2 text-lg hover:bg-[#d2c1aa] sm:text-base"
						on:click={() => (showModal = false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
