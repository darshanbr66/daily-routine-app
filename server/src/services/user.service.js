const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const { generateAccessToken } = require("../utils/jwt");

const registerUser = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

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