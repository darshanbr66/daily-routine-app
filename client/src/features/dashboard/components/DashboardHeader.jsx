import {
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

function DashboardHeader({
  summary,
}) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center">
      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {summary.greeting} 👋
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back! Here's your
          productivity overview for
          today.
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-col gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" />

          <span>
            {summary.currentDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600" />

          <span>
            Completed Today:
            <strong className="ml-1 text-slate-900">
              {summary.completedToday}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;