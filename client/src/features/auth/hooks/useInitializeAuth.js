import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  refresh,
  getCurrentUser,
} from "../api/auth.api";

import {
  setAccessToken,
  setUser,
  initializeAuth,
  logout,
} from "@/store/authSlice";

export const useInitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        /**
         * Refresh Access Token
         */
        const refreshResponse =
          await refresh();

        if (!isMounted) return;

        dispatch(
          setAccessToken(
            refreshResponse.accessToken
          )
        );

        /**
         * Fetch Current User
         */
        const userResponse =
          await getCurrentUser();

        if (!isMounted) return;

        dispatch(
          setUser(userResponse.user)
        );
      } catch (error) {
        /**
         * No valid refresh session.
         * Keep the user logged out.
         */
        dispatch(logout());
      } finally {
        if (isMounted) {
          dispatch(initializeAuth());
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);
};