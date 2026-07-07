import api from "@/api/axios";

/**
 * Login
 */
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Register
 */
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async ({ token, password }) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};