import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { forgotPassword } from "../api/auth.api";
import { setLoading } from "@/store/authSlice";

export const useForgotPassword = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: forgotPassword,

    onMutate: () => {
      dispatch(setLoading(true));
    },

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

    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};