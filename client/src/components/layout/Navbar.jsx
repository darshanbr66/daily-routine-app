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

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const logoutUser = useLogout();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Daily Routine
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="font-semibold text-slate-800">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>
        </div>

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