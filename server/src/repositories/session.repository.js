const UserSession = require("../models/UserSession");

const createSession = (sessionData) => {
  return UserSession.create(sessionData);
};

const findByRefreshTokenHash = (
  refreshTokenHash
) => {
  return UserSession.findOne({
    refreshTokenHash,
    isRevoked: false,
    expiresAt: {
      $gt: new Date(),
    },
  });
};

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

const revokeAllUserSessions = (userId) => {
  return UserSession.updateMany(
    {
      user: userId,
    },
    {
      isRevoked: true,
    }
  );
};

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
  revokeSession,
  revokeAllUserSessions,
  deleteExpiredSessions,
};