import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function MobileSidebar({ navigation }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md p-2 hover:bg-slate-100">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <div className="border-b p-6">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-blue-600"
          >
            Daily Routine
          </Link>
        </div>

        <nav className="flex flex-col p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;