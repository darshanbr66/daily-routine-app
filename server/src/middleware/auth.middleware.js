const { verifyAccessToken } = require("../utils/jwt");

/**
 * Authenticate User
 */
const authenticate = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired access token.",
    });
  }
};

/**
 * Authorize Roles
 */
const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

if (!roles.includes(req.user.role)) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to perform this action.",
  });
}

    next();
  };

  /**
 * Optional Authentication
 *
 * Allows both authenticated and
 * unauthenticated users.
 *
 * Useful for:
 * - Public endpoints
 * - Dashboard previews
 * - Shared pages
 */
const optionalAuthenticate = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return next();
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuthenticate,
};