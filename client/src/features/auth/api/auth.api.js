import api from "@/api/axios";

/**
 * Login
 */
export const login = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

/**
 * Register
 */
export const register = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/**
 * Logout Current Device
 */
export const logout = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

/**
 * Logout All Devices
 */
export const logoutAll = async () => {
  const response = await api.post(
    "/auth/logout-all"
  );

  return response.data;
};

/**
 * Refresh Access Token
 *
 * Normally called automatically by
 * the Axios interceptor.
 */
export const refresh = async () => {
  const response = await api.post(
    "/auth/refresh"
  );

  return response.data;
};

/**
 * Get Current User
 */
export const getCurrentUser = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async ({
  token,
  password,
}) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};