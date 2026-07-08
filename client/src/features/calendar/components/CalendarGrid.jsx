import CalendarDayCell from "./CalendarDayCell";

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function CalendarGrid({
  currentDate,
  events = [],
  onDayClick,
  onEventClick,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of current month
  const firstDay = new Date(year, month, 1);

  // Last day of current month
  const lastDay = new Date(year, month + 1, 0);

  // Days in current month
  const daysInMonth = lastDay.getDate();

  // Sunday = 0
  const startingDay = firstDay.getDay();

  const calendarDays = [];

  // Previous month's trailing days
  const previousMonthLastDay = new Date(
    year,
    month,
    0
  ).getDate();

  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: previousMonthLastDay - i,
      currentMonth: false,
      date: new Date(
        year,
        month - 1,
        previousMonthLastDay - i
      ),
    });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      currentMonth: true,
      date: new Date(year, month, day),
    });
  }

  // Next month
  let nextDay = 1;

  while (calendarDays.length < 42) {
    calendarDays.push({
      day: nextDay,
      currentMonth: false,
      date: new Date(
        year,
        month + 1,
        nextDay
      ),
    });

    nextDay++;
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      {/* Week Header */}

      <div className="grid grid-cols-7 border-b bg-slate-50">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-slate-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}

      <div className="grid grid-cols-7">
        {calendarDays.map((item, index) => (
          <CalendarDayCell
            key={index}
            day={item.day}
            date={item.date}
            isCurrentMonth={
              item.currentMonth
            }
            events={events.filter((event) => {
              const eventDate =
                new Date(event.date);

              return (
                eventDate.toDateString() ===
                item.date.toDateString()
              );
            })}
            onClick={() =>
              onDayClick?.(item.date)
            }
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;