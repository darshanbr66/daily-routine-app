import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navigation } from "./Sidebar";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md p-2 transition hover:bg-slate-100">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        {/* Logo */}
        <div className="border-b px-6 py-5">
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="/logo-icon.png"
              alt="Daily Routine"
              className="h-11 w-11 object-contain"
            />

            <div>
              <h2 className="text-xl font-bold text-indigo-600">
                Daily Routine
              </h2>

              <p className="text-xs text-slate-500">
                Plan • Track • Achieve
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-3">
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
                <Icon className="h-5 w-5" />

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;