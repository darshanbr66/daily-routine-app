import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSelector } from "react-redux";
import { useLogout } from "@/features/auth/hooks/useLogout";

import { LogOut, User } from "lucide-react";

import MobileSidebar from "./MobileSidebar";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const logoutUser = useLogout();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <h1 className="text-xl font-bold text-slate-800 md:text-2xl">
          Daily Routine
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