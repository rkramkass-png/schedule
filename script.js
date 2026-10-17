const scheduleData = {
	1: [
		{
			title: 'Интернет вещей (Лекция)',
			teacher: 'Кульмамиров С. А · 405 аудитория',
			time: '15:00 - 15:50',
		},
		{
			title: 'Деловой иностранный язык (Семинар)',
			teacher: 'Сапаров А. М · 308 аудитория',
			time: '16:00 - 16:50',
		},
		{
			title: 'Деловой иностранный язык (Семинар)',
			teacher: 'Сапаров А. М · 308 аудитория',
			time: '17:00 - 17:50',
		},
	],
	2: [
		{
			title: 'Виртуализация и вычисление (Семинар)',
			teacher: 'Жолдасбеков Н. Ә · 302 аудитория',
			time: '13:00 - 13:50',
		},
		{
			title: 'Криптографические методы защиты информации (Лекция)',
			teacher: 'Абдибекова Л. М · 208 аудитория',
			time: '14:00 - 14:50',
		},
		{
			title: 'Объектно-ориентированное программирование (Лекция)',
			teacher: 'Исаева М. А · 208 аудитория',
			time: '15:00 - 15:50',
		},
		{
			title: 'Криптографические методы защиты информации (Семинар)',
			teacher: 'Толегенова А · 402 аудитория',
			time: '16:00 - 16:50',
		},
		{
			title: 'Криптографические методы защиты информации (Семинар)',
			teacher: 'Толегенова А · 402 аудитория',
			time: '17:00 - 17:50',
		},
	],
	3: [
		{
			title: 'Разработка StartUp (Онлайн-лекция)',
			teacher: 'Акпанова Ж. К',
			time: '09:00 - 09:50',
		},
		{
			title: 'Виртуализация и вычисление (Лекция)',
			teacher: 'Кенебаева Д. Б · 211 аудитория',
			time: '13:00 - 13:50',
		},
		{
			title: 'Виртуализация и вычисление (Семинар)',
			teacher: 'Жолдасбеков Н. Ә · 307 аудитория',
			time: '16:00 - 16:50',
		},
	],
	4: [
		{
			title: 'Облачные сервисы (Онлайн-семинар)',
			teacher: 'Молдашев А',
			time: '09:00 - 09:50',
		},
		{
			title: 'Разработка StartUp (Семинар)',
			teacher: 'Базаров А. В · 415 аудитория',
			time: '13:00 - 13:50',
		},
		{
			title: 'Деловой иностранный язык (Семинар)',
			teacher: 'Сапаров А. М · 415 аудитория',
			time: '14:00 - 14:50',
		},
		{
			title: 'Объектно-ориентированное программирование (Семинар)',
			teacher: 'Демеуғали К. С · 405 аудитория',
			time: '15:00 - 15:50',
		},
		{
			title: 'Объектно-ориентированное программирование (Семинар)',
			teacher: 'Демеуғали К. С · 405 аудитория',
			time: '16:00 - 16:50',
		},
	],
	5: [
		{
			title: 'Интернет вещей (Семинар)',
			teacher: 'Кульмамиров С. А · 410 аудитория',
			time: '09:00 - 09:50',
		},
		{
			title: 'Облачные сервисы (Лекция)',
			teacher: 'Абдрахманов Д. М · 212 аудитория',
			time: '11:00 - 11:50',
		},
		{
			title: 'Интернет вещей (Семинар)',
			teacher: 'Кульмамиров С. А · 410 аудитория',
			time: '12:00 - 12:50',
		},
	],
	6: [],
	0: [],
}

document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tab')
	const tabIndicator = document.getElementById('tabIndicator')
	const mainContent = document.getElementById('mainContent')
	const dateDisplay = document.getElementById('dateDisplay')

	const now = new Date()
	const currentDay = now.getDay()
	let activeDay = currentDay

	const weekdays = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	]

	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	]

	const dayOrder = [1, 2, 3, 4, 5, 6, 0]
	const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay
	const monday = new Date(now)
	monday.setDate(now.getDate() + distanceToMonday)

	function getDateString(day) {
		const targetDate = new Date(monday)
		targetDate.setDate(monday.getDate() + (day === 0 ? 6 : day - 1))

		return `${weekdays[targetDate.getDay()]}, ${targetDate.getDate()} ${months[targetDate.getMonth()]}`
	}

	function updateTabs() {
		tabs.forEach(tab => {
			const day = Number(tab.dataset.day)
			tab.classList.toggle('active', day === activeDay)

			const dot = tab.querySelector('.tab-dot')
			dot.classList.toggle(
				'visible',
				day === currentDay && activeDay !== currentDay,
			)
		})

		tabIndicator.style.transform = `translateX(${dayOrder.indexOf(activeDay) * 100}%)`

		dateDisplay.textContent = getDateString(activeDay)
	}

	function renderDay(day) {
		mainContent.replaceChildren()

		if (day === 6 || day === 0) {
			const message = document.createElement('div')
			message.className = 'weekend-message'
			message.textContent = `В ${day === 6 ? 'субботу' : 'воскресенье'} занятий нету`
			mainContent.appendChild(message)
			return
		}

		const lessons = scheduleData[day] || []

		if (!lessons.length) {
			const message = document.createElement('div')
			message.className = 'weekend-message'
			message.textContent = 'Нет занятий'
			mainContent.appendChild(message)
			return
		}

		const list = document.createElement('div')
		list.className = 'schedule-list'

		lessons.forEach(lesson => {
			const card = document.createElement('div')
			card.className = 'lesson-card'
			card.innerHTML = `
				<div class="lesson-content-group">
					<div class="lesson-title">${lesson.title}</div>
					<div class="lesson-details">${lesson.teacher}</div>
				</div>
				<div class="lesson-footer">
					<div class="lesson-time-pill">${lesson.time}</div>
				</div>
			`
			list.appendChild(card)
		})

		mainContent.appendChild(list)
	}

	function setActiveDay(day) {
		activeDay = day
		updateTabs()
		renderDay(day)
	}

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			setActiveDay(Number(tab.dataset.day))
		})
	})

	setActiveDay(activeDay)
})
