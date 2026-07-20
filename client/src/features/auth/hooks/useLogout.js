import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logout as logoutApi } from "../api/auth.api";

import {
  logout,
  setLoading,
} from "@/store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,

    onMutate: () => {
      dispatch(setLoading(true));
    },

    onSuccess: () => {
      dispatch(logout());

      toast.success("Logged out successfully.");

      navigate("/login", {
        replace: true,
      });
    },

    onError: (error) => {
      /**
       * Even if the backend logout fails,
       * clear the local session.
       */
      dispatch(logout());

      toast.error(
        error?.response?.data?.message ||
          "Session expired."
      );

      navigate("/login", {
        replace: true,
      });
    },

    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};