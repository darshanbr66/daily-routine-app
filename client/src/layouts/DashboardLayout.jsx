import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Section */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Top Navigation */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;