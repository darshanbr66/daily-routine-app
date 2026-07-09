import {
  CalendarDays,
  Clock3,
  Power,
} from "lucide-react";

function RoutineCard({
  routine,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(routine)}
      className="flex min-h-[240px] flex-col rounded-xl border bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Header */}

      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-5 w-5 rounded-full"
            style={{
              backgroundColor:
                routine.color,
            }}
          />

          <h3 className="text-lg font-semibold">
            {routine.name}
          </h3>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            routine.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {routine.isActive
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {/* Description */}

      <p className="mb-4 line-clamp-4 flex-1 text-sm text-slate-600">
        {routine.description ||
          "No description"}
      </p>

      {/* Time */}

      <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
        <Clock3 className="h-4 w-4" />

        <span className="capitalize">
          {routine.timeOfDay}
        </span>
      </div>

      {/* Repeat Days */}

      <div className="mb-4 flex items-start gap-2 text-sm text-slate-600">
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />

        <span className="capitalize">
          {routine.repeatDays.join(", ")}
        </span>
      </div>

      {/* Footer */}

      <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Power className="h-4 w-4" />

          {routine.isActive
            ? "Enabled"
            : "Disabled"}
        </div>

        <span>
          {new Date(
            routine.updatedAt
          ).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
}

export default RoutineCard;