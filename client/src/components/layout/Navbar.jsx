import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useLogout } from "@/features/auth/hooks/useLogout";

import { LogOut, User } from "lucide-react";

import MobileSidebar from "./MobileSidebar";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const logoutUser = useLogout();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";

      case "/dashboard/tasks":
        return "Tasks";

      case "/dashboard/habits":
        return "Habits";

      case "/dashboard/calendar":
        return "Calendar";

      case "/dashboard/goals":
        return "Goals";

      case "/dashboard/notes":
        return "Notes";

      case "/dashboard/settings":
        return "Settings";

      default:
        return "Daily Routine";
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="hidden text-right md:block">
          <p className="font-semibold text-slate-800">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>
        </div>

        {/* Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={logoutUser}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;