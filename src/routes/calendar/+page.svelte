<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import { goto } from '$app/navigation';

	let calendarEl;
	let tasks = [];
	let userId = null;
	let isSelectingDate = sessionStorage.getItem('isSelectingDate') === 'true';
	
	const STATUS = {
		COMPLETED: 'Completed',
		IN_PROGRESS: 'In Progress',
		NOT_STARTED: 'Not Started'
	};

	function getEventColor(status) {
		switch (status) {
			case STATUS.COMPLETED:
				return '#4CAF50';
			case STATUS.IN_PROGRESS:
				return '#F4B942';
			default:
				return '#D8CFC4';
		}
	}

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
				tasks = data.tasks.map((task) => ({
					id: task.id,
					title: task.title,
					endDate: task.endDate,
					category: task.category,
					priority: task.priority,
					status: task.status
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
		const events = tasks.map((task) => {
			const color = getEventColor(task.status); // 👈 关键

			return {
				id: task.id,
				title: task.title,
				start: task.endDate,
				allDay: true,
				backgroundColor: color,
				borderColor: color,
				textColor: '#2E1C0E'
			};
		});

		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth'
			},
			events,
			dateClick: (info) => {
				if (isSelectingDate) {
					sessionStorage.setItem('selectedDate', info.dateStr);
					goto('/quest-log');
				}
			},
			height: 'auto'
		});

		calendar.render();
	}
</script>

<section class="bg-[#FAF6F0] px-6 py-12 sm:px-12 lg:px-28">
	<div bind:this={calendarEl} class="rounded-lg bg-[#EEE9E1] p-4 font-serif shadow-lg"></div>
</section>
