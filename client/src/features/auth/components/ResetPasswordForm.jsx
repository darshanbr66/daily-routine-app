import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { resetPasswordSchema } from "../schemas/auth.schema";
import { useResetPassword } from "../hooks/useResetPassword";

import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

function ResetPasswordForm() {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useResetPassword();

  const onSubmit = (data) => {
    resetPasswordMutation.mutate({
      token,
      password: data.password,
    });
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-bold sm:text-3xl">
          Reset Password
        </CardTitle>

        <p className="text-sm text-slate-500">
          Create a new password for your account.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            registration={register("password")}
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <LoadingButton
            type="submit"
            isLoading={resetPasswordMutation.isPending}
            loadingText="Updating Password..."
          >
            Reset Password
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

export default ResetPasswordForm;