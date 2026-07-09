import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { SidebarProvider } from "@/context/SidebarContext";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-100">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />

          <main className="flex-1 bg-slate-100 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;