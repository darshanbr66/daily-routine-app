const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const { generateAccessToken } = require("../utils/jwt");

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

module.exports = {
  registerUser,
  loginUser,
};