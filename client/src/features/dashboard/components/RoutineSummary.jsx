import {
  FaArrowRight,
  FaClock,
  FaSyncAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function RoutineSummary({ routines }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaSyncAlt className="text-purple-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Active Routines
          </h2>
        </div>

        <Link
          to="/dashboard/routines"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Content */}

      {routines.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          No active routines found.
        </div>
      ) : (
        <div className="space-y-4">
          {routines.map((routine) => (
            <div
              key={routine._id}
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {routine.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <FaClock />

                    <span className="capitalize">
                      {routine.timeOfDay}
                    </span>
                  </div>
                </div>

                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      routine.color,
                  }}
                />
              </div>

              <p className="mt-3 text-xs capitalize text-slate-500">
                {routine.repeatDays.join(
                  ", "
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <Link
        to="/dashboard/routines"
        className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Manage Routines

        <FaArrowRight />
      </Link>
    </div>
  );
}

export default RoutineSummary;