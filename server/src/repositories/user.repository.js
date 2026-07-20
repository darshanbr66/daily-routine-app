const User = require("../models/User");

/**
 * Find user by email
 */
const findByEmail = (email) => {
  return User.findOne({ email });
};

/**
 * Create new user
 */
const createUser = (userData) => {
  return User.create(userData);
};

/**
 * Find user by ID
 */
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
  return User.findByIdAndUpdate(
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
  return User.findOne({
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
  return User.findByIdAndUpdate(
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
 * Update user password
 */
const updatePassword = async (
  userId,
  hashedPassword
) => {
  return User.findByIdAndUpdate(
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

module.exports = {
  findByEmail,
  createUser,
  findById,

  updateResetPasswordToken,
  findByResetPasswordToken,
  clearResetPasswordToken,
  updatePassword,
};