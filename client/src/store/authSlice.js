import { createSlice } from "@reduxjs/toolkit";
import { tokenService } from "@/api/token.service";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,

  accessToken:
    tokenService.getAccessToken(),

  isAuthenticated:
    !!tokenService.getAccessToken(),

  loading: false,

  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;

      state.isAuthenticated = true;

      state.initialized = true;

      tokenService.setAccessToken(
        action.payload.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },

    setAccessToken: (
      state,
      action
    ) => {
      state.accessToken = action.payload;

      state.isAuthenticated = true;

      tokenService.setAccessToken(
        action.payload
      );
    },

    setUser: (
      state,
      action
    ) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    setLoading: (
      state,
      action
    ) => {
      state.loading = action.payload;
    },

    initializeAuth: (
      state
    ) => {
      state.initialized = true;
    },

    logout: (state) => {
      state.user = null;

      state.accessToken = null;

      state.isAuthenticated = false;

      state.loading = false;

      state.initialized = true;

      tokenService.clear();

      localStorage.removeItem("user");
    },
  },
});

export const {
  loginSuccess,
  setAccessToken,
  setUser,
  setLoading,
  initializeAuth,
  logout,
} = authSlice.actions;

export default authSlice.reducer;