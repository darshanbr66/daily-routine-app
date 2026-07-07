import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { forgotPasswordSchema } from "../schemas/auth.schema";
import { useForgotPassword } from "../hooks/useForgotPassword";

import LoadingButton from "./LoadingButton";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate(data.email);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-bold sm:text-3xl">
          Forgot Password
        </CardTitle>

        <p className="text-sm text-slate-500">
          Enter your email address and we'll send you a password reset link.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <LoadingButton
            type="submit"
            isLoading={forgotPasswordMutation.isPending}
            loadingText="Sending..."
          >
            Send Reset Link
          </LoadingButton>

          <p className="text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 transition hover:text-indigo-600"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default ForgotPasswordForm;