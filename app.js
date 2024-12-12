function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let monthOffset = 0; monthOffset < 2; monthOffset++) {
        const month = (currentMonth + monthOffset) % 12;
        const year = currentYear + Math.floor((currentMonth + monthOffset) / 12);
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        monthDiv.innerHTML = `<h2>${monthName} ${year}</h2>`;

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysOfWeekDiv = document.createElement('div');
        daysOfWeekDiv.className = 'days-of-week';
        daysOfWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day-of-week';
            dayDiv.innerText = day;
            daysOfWeekDiv.appendChild(dayDiv);
        });
        monthDiv.appendChild(daysOfWeekDiv);

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'day empty';
            monthDiv.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.innerText = day;
            dayDiv.addEventListener('click', () => highlightSelectedDate(dayDiv));
            monthDiv.appendChild(dayDiv);
        }

        calendar.appendChild(monthDiv);
    }
}

function highlightCurrentDate() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        const dayDate = new Date(currentYear, currentMonth, parseInt(day.innerText));
        if (dayDate.getDate() === currentDay && dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear) {
            day.classList.add('current-date');
        }
    });
}

function highlightSelectedDate(dayDiv) {
    const selectedDates = document.querySelectorAll('.selected-date');
    selectedDates.forEach(date => date.classList.remove('selected-date'));
    dayDiv.classList.add('selected-date');
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    highlightCurrentDate();
});
