<script>
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';

	let calendarEl;

	// fake data
	const tasks = [
		{ id: 1, title: 'Slay Goblin King', endDate: '2025-12-07' },
		{ id: 2, title: 'Collect Magic Herbs', endDate: '2025-12-08' },
		{ id: 3, title: 'Train Sword Skills', endDate: '2025-12-09' }
	];

	onMount(() => {
		const events = tasks.map((task) => {
			const deadline = new Date(task.endDate);

			// defalut 8:00-17:00
			const start = new Date(deadline);
			start.setHours(8, 0, 0);

			const end = new Date(deadline);
			end.setHours(17, 0, 0);

			return {
				id: task.id,
				title: task.title,
				start,
				end,
				extendedProps: { coin: true }
			};
		});

		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			},
			events,
			eventClick: (info) => {
				alert(`Task: ${info.event.title}`);
			},
			dateClick: (info) => {
				alert(`Clicked date: ${info.dateStr}`);
			},
			eventContent: (arg) => {
				return {
					html: `
            <span>${arg.event.title}</span>
        `
				};
			},
			height: 'auto'
		});

		calendar.render();
	});
</script>

<section class="bg-[#FAF6F0] px-6 py-12 sm:px-12 lg:px-28">
	<h2 class="mb-8 text-center font-['IM_Fell_Great_Primer_SC'] text-4xl text-[#4F3117]">
		Quest Calendar
	</h2>

	<div bind:this={calendarEl} class="rounded-lg bg-[#EEE9E1] p-4 shadow-lg"></div>
</section>
