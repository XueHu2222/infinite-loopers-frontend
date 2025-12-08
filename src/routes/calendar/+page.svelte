<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import { goto } from '$app/navigation';

	let calendarEl;
	let tasks = [];
	let userId = null;

	onMount(() => {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) {
			console.error('No user found, please login first.');
			return;
		}
		const user = JSON.parse(storedUser);
		userId = user.id;

		loadTasks();
	});

	async function loadTasks() {
		if (!userId) return;
		try {
			const res = await fetch(`http://localhost:3011/tasks/${userId}`);
			const data = await res.json();
			if (data.success) {
				tasks = data.tasks.map(task => ({
					id: task.id,
					title: task.title,
					endDate: task.endDate,
					category: task.category,
					priority: task.priority
				}));
				renderCalendar();
			} else {
				console.error(data.message);
			}
		} catch (err) {
			console.error(err);
		}
	}

	function renderCalendar() {
		const events = tasks.map(task => ({
			id: task.id,
			title: task.title,
			start: task.endDate,
			allDay: true
		}));

		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth'
			},
			events,
			dateClick: info => {
				sessionStorage.setItem('selectedDate', info.dateStr);
				goto('/quest-log');
			},
			height: 'auto'
		});

		calendar.render();
	}
</script>

<section class="bg-[#FAF6F0] px-6 py-12 sm:px-12 lg:px-28">
	<h2 class="mb-8 text-center font-['IM_Fell_Great_Primer_SC'] text-4xl text-[#4F3117]">
		Calendar
	</h2>

	<div bind:this={calendarEl} class="rounded-lg bg-[#EEE9E1] p-4 shadow-lg"></div>
</section>
