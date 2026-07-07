import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { registerSchema } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useRegister";

import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = (data) => {
    const { confirmPassword: _confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-bold sm:text-3xl">
          Create Account
        </CardTitle>

        <p className="text-sm text-slate-500">
          Start organizing your tasks, habits and goals.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              First Name
            </label>

            <Input
              className="h-11"
              placeholder="Enter your first name"
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Last Name
            </label>

            <Input
              className="h-11"
              placeholder="Enter your last name"
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              className="h-11"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            registration={register("password")}
            error={errors.password}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <LoadingButton
            type="submit"
            isLoading={registerMutation.isPending}
            loadingText="Creating Account..."
          >
            Create Account
          </LoadingButton>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 transition hover:text-indigo-600"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;