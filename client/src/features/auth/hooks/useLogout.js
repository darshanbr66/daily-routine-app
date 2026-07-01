import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return () => {
    dispatch(logout());

    navigate("/login");
  };
};