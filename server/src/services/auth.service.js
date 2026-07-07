const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userRepository = require("../repositories/user.repository");
const { generateAccessToken } = require("../utils/jwt");
const { sendEmail } = require("../config/mail");

/**
 * Register a new user
 */
const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Check if user already exists
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await userRepository.createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

/**
 * Login user
 */
const loginUser = async ({ email, password }) => {
  // Find user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    accessToken,
  };
};

const forgotPassword = async (email) => {
  // Find user
  const user = await userRepository.findByEmail(email);

  // Prevent email enumeration
  if (!user) {
    return {
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  }

  // Generate secure token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before storing
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expire after 15 minutes
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Save token
  await userRepository.updateResetPasswordToken(
    user._id,
    hashedToken,
    expiresAt
  );

  // Build reset URL
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Email template
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Reset Your Password</h2>

      <p>Hello <strong>${user.firstName}</strong>,</p>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to continue.
      </p>

      <p style="margin: 30px 0;">
        <a
          href="${resetUrl}"
          style="
            background:#2563eb;
            color:#fff;
            padding:12px 22px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
            font-weight:bold;
          "
        >
          Reset Password
        </a>
      </p>

      <p>
        This link will expire in <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't request this password reset, you can safely ignore this email.
      </p>

      <hr>

      <p style="color:#64748b;font-size:13px;">
        Daily Routine App
      </p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: "Reset your Daily Routine password",
    html,
  });

  return {
    success: true,
    message:
      "If an account with that email exists, a password reset link has been sent.",
  };
};

const resetPassword = async (token, password) => {
  // 1. Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 2. Find valid user
  const user =
    await userRepository.findByResetPasswordToken(
      hashedToken
    );

  if (!user) {
    throw new Error("Invalid or expired reset link.");
  }

  // 3. Hash new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 4. Update password
  await userRepository.updatePassword(
    user._id,
    hashedPassword
  );

  return {
    success: true,
    message:
      "Password reset successful. Please log in with your new password.",
  };
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};