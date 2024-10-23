const calendarGrid = document.getElementById('calendar-grid');
const currentMonthDisplay = document.getElementById('current-month');
const eventModal = document.getElementById('event-modal');
const eventTitleInput = document.getElementById('event-title');
const saveEventButton = document.getElementById('save-event');
const closeModalButton = document.getElementById('close-modal');
let selectedDate = null;
let events = JSON.parse(localStorage.getItem('events')) || [];

const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function loadCalendar() {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();

  calendarGrid.innerHTML = ''; // Clear previous calendar

  // Update month and year display
  currentMonthDisplay.textContent = `${firstDayOfMonth.toLocaleString('default', {
    month: 'long',
  })} ${currentYear}`;

  // Fill empty slots before the first day
  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }

  // Fill actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = day;

    const eventsForDay = events.filter(
      (e) => e.date === `${currentYear}-${currentMonth}-${day}`
    );

    eventsForDay.forEach((event) => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      eventDiv.textContent = event.title;
      dayCell.appendChild(eventDiv);
    });

    dayCell.addEventListener('click', () => openModal(day));
    calendarGrid.appendChild(dayCell);
  }
}

function openModal(day) {
  selectedDate = `${currentYear}-${currentMonth}-${day}`;
  eventModal.style.display = 'block';
}

function closeModal() {
  eventModal.style.display = 'none';
  eventTitleInput.value = '';
}

function saveEvent() {
  const eventTitle = eventTitleInput.value;
  if (!eventTitle) return;

  events.push({ date: selectedDate, title: eventTitle });
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
  loadCalendar();
}

document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth--;
  loadCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth++;
  loadCalendar();
});

saveEventButton.addEventListener('click', saveEvent);
closeModalButton.addEventListener('click', closeModal);

// Initial load
loadCalendar();
