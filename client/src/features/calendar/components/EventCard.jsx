function EventCard({ event, onClick }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(event);
      }}
      className="w-full truncate rounded px-2 py-1 text-left text-[11px] font-medium text-white shadow-sm transition hover:opacity-90"
      style={{
        backgroundColor: event.color || "#3B82F6",
      }}
      title={`${event.title}${
        event.startTime ? ` • ${event.startTime}` : ""
      }`}
    >
      {event.startTime && (
        <span className="mr-1 opacity-90">
          {event.startTime}
        </span>
      )}

      {event.title}
    </button>
  );
}

export default EventCard;