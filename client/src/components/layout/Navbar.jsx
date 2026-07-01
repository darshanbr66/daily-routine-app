function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">
        Daily Routine
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Welcome, Darshan 👋
        </span>

        <img
          src="https://ui-avatars.com/api/?name=Darshan"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </header>
  );
}

export default Navbar;