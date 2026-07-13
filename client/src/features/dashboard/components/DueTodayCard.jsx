import {
  FaArrowRight,
  FaCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function getPriorityBadge(priority) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";

    case "medium":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-green-100 text-green-700";
  }
}

function DueTodayCard({ tasks }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Due Today & Overdue
          </h2>
        </div>

        <Link
          to="/dashboard/tasks"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          🎉 You're all caught up!
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-start justify-between rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900">
                  {task.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Due{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPriorityBadge(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/dashboard/tasks"
        className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Open Tasks

        <FaArrowRight />
      </Link>
    </div>
  );
}

export default DueTodayCard;