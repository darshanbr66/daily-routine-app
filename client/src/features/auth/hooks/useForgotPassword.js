import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { forgotPassword } from "../api/auth.api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "If an account with that email exists, a password reset link has been sent."
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    },
  });
}