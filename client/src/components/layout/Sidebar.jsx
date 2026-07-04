import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaBullseye,
  FaStickyNote,
  FaCog,
} from "react-icons/fa";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Tasks",
    path: "/dashboard/tasks",
    icon: FaTasks,
  },
  {
    name: "Habits",
    path: "/dashboard/habits",
    icon: FaCheckCircle,
  },
  {
    name: "Calendar",
    path: "/dashboard/calendar",
    icon: FaCalendarAlt,
  },
  {
    name: "Goals",
    path: "/dashboard/goals",
    icon: FaBullseye,
  },
  {
    name: "Notes",
    path: "/dashboard/notes",
    icon: FaStickyNote,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: FaCog,
  },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r bg-white shadow-lg md:flex md:flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <img
          src="/logo-icon.png"
          alt="Daily Routine"
          className="h-11 w-11 object-contain"
        />

        <div>
          <h1 className="text-xl font-bold text-indigo-600">
            Daily Routine
          </h1>

          <p className="text-xs text-gray-500">
            Plan • Track • Achieve
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-1 flex-col gap-2 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`
              }
            >
              <Icon className="text-lg" />
              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;