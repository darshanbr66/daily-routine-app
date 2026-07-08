import EventCard from "./EventCard";

function CalendarDayCell({
  day,
  date,
  isCurrentMonth,
  events = [],
  onClick,
  onEventClick,
}) {
  const today = new Date();

  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  const isWeekend =
    date.getDay() === 0 || date.getDay() === 6;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        min-h-[110px]
        border
        p-2
        text-left
        transition-all
        hover:bg-slate-50

        ${
          isCurrentMonth
            ? "bg-white"
            : "bg-slate-100"
        }

        ${
          isWeekend && isCurrentMonth
            ? "bg-slate-50"
            : ""
        }

        ${
          isToday
            ? "ring-2 ring-indigo-500 ring-inset"
            : ""
        }
      `}
    >
      {/* Day Number */}

      <div className="mb-2 flex justify-between">
        <span
          className={`
            flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold

            ${
              isToday
                ? "bg-indigo-600 text-white"
                : isCurrentMonth
                ? "text-slate-900"
                : "text-slate-400"
            }
          `}
        >
          {day}
        </span>
      </div>

      {/* Events */}

      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onClick={onEventClick}
          />
        ))}

        {events.length > 3 && (
          <div className="text-xs font-medium text-slate-500">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </button>
  );
}

export default CalendarDayCell;