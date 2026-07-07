function AuthLayout({
  children,
  description = "Organize your tasks, build better habits, achieve your goals, and stay productive with one beautiful application.",
}) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Desktop Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-slate-900 px-20 text-white">
        <img
          src="/logo-icon.png"
          alt="Daily Routine"
          className="mb-8 h-20 w-20"
        />

        <h1 className="text-5xl font-bold">
          Daily Routine
        </h1>

        <p className="mt-3 text-lg font-medium text-orange-300">
          Plan • Focus • Achieve
        </p>

        <p className="mt-8 max-w-md text-lg leading-8 text-slate-300">
          {description}
        </p>
      </div>

      {/* Auth Content */}
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <img
              src="/logo-icon.png"
              alt="Daily Routine"
              className="h-20 w-20"
            />

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Daily Routine
            </h1>

            <p className="mt-1 text-center text-sm text-slate-500">
              Plan • Focus • Achieve
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;