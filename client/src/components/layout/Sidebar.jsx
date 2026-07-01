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

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Tasks", path: "/tasks", icon: <FaTasks /> },
  { name: "Habits", path: "/habits", icon: <FaCheckCircle /> },
  { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  { name: "Goals", path: "/goals", icon: <FaBullseye /> },
  { name: "Notes", path: "/notes", icon: <FaStickyNote /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg border-r min-h-screen">
      <div className="p-6 text-2xl font-bold text-indigo-600">
        Daily Routine
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;