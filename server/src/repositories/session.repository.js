const UserSession = require("../models/UserSession");

/**
 * Create a new user session
 */
const createSession = (sessionData) => {
  return UserSession.create(sessionData);
};

/**
 * Find active session by refresh token hash
 */
const findByRefreshTokenHash = (
  refreshTokenHash
) => {
  return UserSession.findOne({
    refreshTokenHash,
    isRevoked: false,
    expiresAt: {
      $gt: new Date(),
    },
  }).populate("user");
};

/**
 * Find session by ID
 */
const findById = (id) => {
  return UserSession.findById(id).populate("user");
};

/**
 * Update refresh token (Rotation)
 */
const updateRefreshToken = (
  sessionId,
  refreshTokenHash,
  expiresAt
) => {
  return UserSession.findByIdAndUpdate(
    sessionId,
    {
      refreshTokenHash,
      expiresAt,
    },
    {
      new: true,
    }
  );
};

/**
 * Revoke current session
 */
const revokeSession = (id) => {
  return UserSession.findByIdAndUpdate(
    id,
    {
      isRevoked: true,
    },
    {
      new: true,
    }
  );
};

/**
 * Revoke every session of a user
 */
const revokeAllUserSessions = (
  userId
) => {
  return UserSession.updateMany(
    {
      user: userId,
      isRevoked: false,
    },
    {
      isRevoked: true,
    }
  );
};

/**
 * Delete expired sessions
 */
const deleteExpiredSessions = () => {
  return UserSession.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });
};

module.exports = {
  createSession,
  findByRefreshTokenHash,
  findById,
  updateRefreshToken,
  revokeSession,
  revokeAllUserSessions,
  deleteExpiredSessions,
};