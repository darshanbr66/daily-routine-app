import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaBullseye,
  FaStickyNote,
  FaCog,
  FaSyncAlt,
} from "react-icons/fa";

import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";

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
    name: "Routines",
    path: "/dashboard/routines",
    icon: FaSyncAlt,
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
  const { collapsed, toggleSidebar } =
    useSidebar();

  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-shrink-0 overflow-hidden border-r bg-white shadow-lg transition-all duration-300 ease-in-out md:flex md:flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}

      <div className="border-b">
        {!collapsed ? (
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/logo-icon.png"
                alt="Daily Routine"
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="overflow-hidden whitespace-nowrap transition-all duration-300">
                <h1 className="text-lg font-bold text-indigo-600">
                  Daily Routine
                </h1>

                <p className="text-xs text-gray-500">
                  Plan • Track • Achieve
                </p>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              title="Collapse Sidebar"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-5">
            <img
              src="/logo-icon.png"
              alt="Daily Routine"
              className="h-9 w-9 object-contain"
            />

            <button
              onClick={toggleSidebar}
              title="Expand Sidebar"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </button>
          </div>
        )}
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
              title={collapsed ? item.name : ""}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-300 ${
                  collapsed
                    ? "justify-center px-3 py-3"
                    : "px-4 py-3"
                } ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  collapsed
                    ? "ml-0 w-0 opacity-0"
                    : "ml-3 w-auto opacity-100"
                }`}
              >
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