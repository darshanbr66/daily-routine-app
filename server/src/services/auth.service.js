const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  findByEmail,
  createUser,
  findById,
  updateResetPasswordToken,
  findByResetPasswordToken,
  // clearResetPasswordToken,
  updatePassword,
} = require("../repositories/user.repository");

const {
  createSession,
  findByRefreshTokenHash,
  updateRefreshToken,
  revokeSession,
  revokeAllUserSessions,
  deleteExpiredSessions,
} = require("../repositories/session.repository");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} = require("../utils/jwt");

const sendMail = require("../config/mail");

const INVALID_CREDENTIALS =
  "Invalid email or password.";
const INVALID_REFRESH_TOKEN =
  "Invalid or expired refresh token.";
const USER_NOT_FOUND =
  "User not found.";
const USER_ALREADY_EXISTS = "User already exists.";
const SESSION_NOT_FOUND = "Session not found.";
const INVALID_SESSION = "Invalid session.";
const INVALID_RESET_TOKEN = "Invalid or expired reset token.";

/**
 * Hash refresh token before storing
 */
const hashRefreshToken = (refreshToken) => {
  return crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
};

/**
 * Remove sensitive fields
 */
const sanitizeUser = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Generate authentication tokens
 */
const generateAuthTokens = async (
  user,
  userAgent = "",
  ipAddress = ""
) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  const refreshTokenHash =
    hashRefreshToken(refreshToken);

  const expiresAt =
    getRefreshTokenExpiry();

  await createSession({
    user: user._id,
    refreshTokenHash,
    expiresAt,
    userAgent,
    ipAddress,
  });

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Register User
 */
const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  userAgent = "",
  ipAddress = "",
}) => {
  email = email.trim().toLowerCase();

  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw new Error(USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } =
    await generateAuthTokens(user, userAgent, ipAddress);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

/**
 * Login User
 */
const loginUser = async ({
  email,
  password,
  userAgent = "",
  ipAddress = "",
}) => {
  email = email.trim().toLowerCase();

  const user = await findByEmail(email);

  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const { accessToken, refreshToken } =
    await generateAuthTokens(
      user,
      userAgent,
      ipAddress
    );

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh Access Token
 */
const refreshAccessToken = async (
  refreshToken,
  userAgent = "",
  ipAddress = ""
) => {
  if (!refreshToken) {
    throw new Error(INVALID_REFRESH_TOKEN);
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new Error(INVALID_REFRESH_TOKEN);
  }

  const refreshTokenHash =
    hashRefreshToken(refreshToken);

  const session =
    await findByRefreshTokenHash(
      refreshTokenHash
    );

  if (!session) {
    throw new Error(SESSION_NOT_FOUND);
  }

  if (String(session.user._id) !== String(payload.id)) {
    throw new Error(INVALID_SESSION);
  }

  /**
   * Generate new tokens (Rotation)
   */
  const newAccessToken =
    generateAccessToken({
      id: session.user._id,
      email: session.user.email,
      role: session.user.role,
    });

  const newRefreshToken =
    generateRefreshToken({
      id: session.user._id,
      email: session.user.email,
      role: session.user.role,
    });

  const newRefreshTokenHash =
    hashRefreshToken(newRefreshToken);

  const expiresAt =
    getRefreshTokenExpiry();

  await updateRefreshToken(
    session._id,
    newRefreshTokenHash,
    expiresAt
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: sanitizeUser(session.user),
  };
};

/**
 * Logout Current Device
 */
const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  try {
    const refreshTokenHash =
      hashRefreshToken(refreshToken);

    const session =
      await findByRefreshTokenHash(
        refreshTokenHash
      );

    if (!session) {
      return;
    }

    await revokeSession(session._id);
  } catch (error) {
    // Ignore logout errors
    return;
  }
};

/**
 * Logout All Devices
 */
const logoutAllDevices = async (
  userId
) => {
  const user = await findById(userId);

  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }

  await revokeAllUserSessions(userId);

  return {
    success: true,
    message:
      "Logged out from all devices successfully.",
  };
};

/**
 * Forgot Password
 */
const forgotPassword = async (email) => {
  email = email.trim().toLowerCase();

  const user = await findByEmail(email);

  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }

  const resetToken = crypto
    .randomBytes(32)
    .toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetPasswordExpires =
    new Date(Date.now() + 15 * 60 * 1000);

  await updateResetPasswordToken(
    user._id,
    resetPasswordToken,
    resetPasswordExpires
  );

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height:1.6">
      <h2>Reset Password</h2>

      <p>Hello ${user.firstName},</p>

      <p>You requested to reset your password.</p>

      <p>
        Click the link below to continue:
      </p>

      <p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      </p>

      <p>
        This link will expire in
        <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't request this,
        please ignore this email.
      </p>
    </div>
  `;

  await sendMail({
    to: user.email,
    subject: "Reset Password",
    html,
  });

  return {
    success: true,
    message:
      "Password reset email sent successfully.",
  };
};

/**
 * Reset Password
 */
const resetPassword = async (
  resetToken,
  newPassword
) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user =
    await findByResetPasswordToken(
      resetPasswordToken
    );

  if (!user) {
    throw new Error(INVALID_RESET_TOKEN);
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await updatePassword(
    user._id,
    hashedPassword
  );

  /**
   * Security:
   * Password changed means every device
   * should login again.
   */
  await revokeAllUserSessions(user._id);

  return {
    success: true,
    message:
      "Password reset successfully.",
  };
};

/**
 * Get Current User
 */
const getCurrentUser = async (
  userId
) => {
  const user = await findById(userId);

  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }

  return sanitizeUser(user);
};

/**
 * Cleanup Expired Sessions
 *
 * Can be called:
 * - Server startup
 * - Cron Job
 * - Scheduled Task
 */
const cleanupExpiredSessions = async () => {
  await deleteExpiredSessions();
};


module.exports = {
  registerUser,

  loginUser,

  refreshAccessToken,

  logoutUser,

  logoutAllDevices,

  forgotPassword,

  resetPassword,

  getCurrentUser,

  cleanupExpiredSessions,

};