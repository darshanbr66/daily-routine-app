import {
  FaTasks,
  FaCheckCircle,
  FaBullseye,
  FaStickyNote,
  FaSyncAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const actions = [
  {
    title: "New Task",
    icon: FaTasks,
    to: "/dashboard/tasks",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "New Habit",
    icon: FaCheckCircle,
    to: "/dashboard/habits",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "New Goal",
    icon: FaBullseye,
    to: "/dashboard/goals",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "New Note",
    icon: FaStickyNote,
    to: "/dashboard/notes",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "New Routine",
    icon: FaSyncAlt,
    to: "/dashboard/routines",
    color: "bg-purple-100 text-purple-600",
  },
];

function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex flex-col items-center rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon className="text-xl" />
              </div>

              <span className="text-center text-sm font-medium text-slate-700">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;