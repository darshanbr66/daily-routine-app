import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { resetPassword } from "../api/auth.api";
import { setLoading } from "@/store/authSlice";

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,

    onMutate: () => {
      dispatch(setLoading(true));
    },

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Password reset successful."
      );

      navigate("/login", {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password."
      );
    },

    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};