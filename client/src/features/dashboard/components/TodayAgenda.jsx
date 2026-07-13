import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function TodayAgenda({ agenda }) {
  const getRoutineIcon = (time) => {
    switch (time) {
      case "morning":
        return "🌅";

      case "afternoon":
        return "☀️";

      case "evening":
        return "🌙";

      case "night":
        return "🌃";

      default:
        return "🔄";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Today's Agenda
          </h2>
        </div>

        <Link
          to="/dashboard/calendar"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View Calendar
        </Link>
      </div>

      {/* Content */}

      {agenda.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          🎉 Nothing scheduled for today.
        </div>
      ) : (
        <div className="space-y-4">
          {agenda.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {item.type === "routine"
                    ? getRoutineIcon(item.time)
                    : "📋"}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  {item.type === "routine" ? (
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <FaClock />

                      <span className="capitalize">
                        {item.time}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold capitalize ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  )}
                </div>
              </div>

              {item.type === "routine" && (
                <FaCheckCircle
                  className="text-green-500"
                  size={18}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <Link
        to="/dashboard/calendar"
        className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Open Calendar

        <FaArrowRight />
      </Link>
    </div>
  );
}

export default TodayAgenda;