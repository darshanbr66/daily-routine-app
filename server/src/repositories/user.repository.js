const User = require("../models/User");

const findByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (userData) => {
  return User.create(userData);
};

const findById = (id) => {
  return User.findById(id);
};

/**
 * Save reset password token and expiry
 */
const updateResetPasswordToken = async (
  userId,
  resetPasswordToken,
  resetPasswordExpires
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      resetPasswordToken,
      resetPasswordExpires,
    },
    {
      new: true,
    }
  );
};

/**
 * Find user by reset password token
 */
const findByResetPasswordToken = async (
  resetPasswordToken
) => {
  return await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: {
      $gt: new Date(),
    },
  });
};

/**
 * Clear reset password token
 */
const clearResetPasswordToken = async (
  userId
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      new: true,
    }
  );
};

/**
 * Update user password and clear reset token
 */
const updatePassword = async (
  userId,
  hashedPassword
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      new: true,
    }
  );
};

/**
 * Save refresh token
 */
const updateRefreshToken = async (
  userId,
  refreshToken,
  refreshTokenExpires
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      refreshToken,
      refreshTokenExpires,
    },
    {
      new: true,
    }
  );
};

/**
 * Find user by refresh token
 */
const findByRefreshToken = async (
  refreshToken
) => {
  return await User.findOne({
    refreshToken,
    refreshTokenExpires: {
      $gt: new Date(),
    },
  });
};

/**
 * Clear refresh token
 */
const clearRefreshToken = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: null,
      refreshTokenExpires: null,
    },
    {
      new: true,
    }
  );
};

module.exports = {
  findByEmail,
  createUser,
  findById,

  updateResetPasswordToken,
  findByResetPasswordToken,
  clearResetPasswordToken,
  updatePassword,

  updateRefreshToken,
  findByRefreshToken,
  clearRefreshToken,
};