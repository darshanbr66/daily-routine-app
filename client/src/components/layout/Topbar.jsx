import MobileSidebar from "./MobileSidebar";

function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:hidden">
      {/* Mobile Menu */}
      <MobileSidebar />

      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <img
          src="/logo-icon.png"
          alt="Daily Routine"
          className="h-9 w-9 object-contain"
        />

        <span className="text-lg font-bold text-indigo-600">
          Daily Routine
        </span>
      </div>

      {/* Spacer for balanced layout */}
      <div className="w-10" />
    </header>
  );
}

export default Topbar;