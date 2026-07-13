import {
  FaArrowRight,
  FaBullseye,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function getStatusBadge(status) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";

    case "in-progress":
      return "bg-blue-100 text-blue-700";

    case "on-hold":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function GoalProgress({ goals }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBullseye className="text-orange-500" />

          <h2 className="text-lg font-semibold text-slate-900">
            Goal Progress
          </h2>
        </div>

        <Link
          to="/dashboard/goals"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Content */}

      {goals.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          No goals available.
        </div>
      ) : (
        <div className="space-y-5">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-xl">
                    {goal.icon}
                  </span>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {goal.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <FaCalendarAlt />

                      <span>
                        {goal.targetDate
                          ? new Date(
                              goal.targetDate
                            ).toLocaleDateString()
                          : "No target date"}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                    goal.status
                  )}`}
                >
                  {goal.status.replace("-", " ")}
                </span>
              </div>

              {/* Progress */}

              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${goal.progress}%`,
                    backgroundColor:
                      goal.color,
                  }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Progress
                </span>

                <span className="font-semibold text-slate-900">
                  {goal.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <Link
        to="/dashboard/goals"
        className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Manage Goals

        <FaArrowRight />
      </Link>
    </div>
  );
}

export default GoalProgress;