import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLogin();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-bold sm:text-3xl">
          Welcome Back
        </CardTitle>

        <p className="text-sm text-slate-500">
          Sign in to continue to your workspace.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
              className="h-11"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-slate-500 transition hover:text-slate-900"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Login"}
          </Button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 transition hover:text-indigo-600"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;