import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { register } from "../api/auth.api";
import { setLoading } from "@/store/authSlice";

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,

    onMutate: () => {
      dispatch(setLoading(true));
    },

    onSuccess: () => {
      toast.success(
        "Account created successfully."
      );

      navigate("/login", {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed."
      );
    },

    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};