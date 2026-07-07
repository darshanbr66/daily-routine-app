import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { register } from "../api/auth.api";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Account created successfully!");

      navigate("/login");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    },
  });
}