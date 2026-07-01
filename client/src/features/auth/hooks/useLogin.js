import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login } from "../api/auth.api";
import { loginSuccess } from "@/store/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      toast.success("Login successful");

      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });
};