import { useForm } from "react-hook-form";

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
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold">
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
              className="text-sm text-slate-500 hover:text-black transition"
            >
              Forgot Password?
            </button>
          </div>

          <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? "Signing In..." : "Login"}
            </Button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-slate-900 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;