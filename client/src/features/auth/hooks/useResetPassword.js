import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { resetPassword } from "../api/auth.api";

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Password reset successful."
      );

      navigate("/login");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password."
      );
    },
  });
}