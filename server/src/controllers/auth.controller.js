const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  logoutAllDevices,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} = require("../services/auth.service");

/**
 * Cookie Configuration
 */
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
};



/**
 * Register
 */
const register = async (req, res, next) => {
  try {
    
      // Get IP Address and User Agent
      const ipAddress =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

      const userAgent =
        req.headers["user-agent"];
        
    const { firstName, lastName, email, password } =
      req.body;

    const result = await registerUser({
      firstName,
      lastName,
      email,
      password,
      userAgent,
      ipAddress
    });

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login
 */
const login = async (req, res, next) => {
  try {
      // Get IP Address and User Agent
      const ipAddress =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

      const userAgent =
        req.headers["user-agent"];
  

    const { email, password } = req.body;

    const result = await loginUser({
      email,
      password,
      userAgent,
      ipAddress,
    });

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    return res.json({
      success: true,
      message: "Login successful.",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh Access Token
 */
const refresh = async (req, res, next) => {
  try {

      // Get IP Address and User Agent
      const ipAddress =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

      const userAgent =
        req.headers["user-agent"];
  

    const refreshToken = req.cookies?.refreshToken;

    const result = await refreshAccessToken(
      refreshToken,
      userAgent,
      ipAddress,
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout Current Device
 */
const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await logoutUser(refreshToken);

    res.clearCookie(
      "refreshToken",
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout From All Devices
 */
const logoutAll = async (
  req,
  res,
  next
) => {
  try {
    await logoutAllDevices(req.user.id);

    res.clearCookie(
      "refreshToken",
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      message:
        "Logged out from all devices successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot Password
 */
const forgotPasswordController = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
const resetPasswordController = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPassword(
      token,
      password
    );

    res.clearCookie(
      "refreshToken",
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current User
 */
const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController,
  me,
};