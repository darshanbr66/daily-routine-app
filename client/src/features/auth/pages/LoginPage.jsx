import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-slate-900 px-20 text-white">
        <h1 className="text-5xl font-bold">
          Daily Routine
        </h1>

        <p className="mt-6 max-w-md text-lg text-slate-300">
          Plan your day, build better habits, achieve your goals,
          and stay productive with one beautiful application.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;