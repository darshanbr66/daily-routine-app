const express = require("express");

const {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  me,
} = require("../controllers/auth.controller");

const {
  authenticate,
} = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Authentication
 */
router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/refresh",
  refresh
);

router.post(
  "/logout",
  logout
);

/**
 * Password
 */
router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

/**
 * Protected Routes
 */
router.post(
  "/logout-all",
  authenticate,
  logoutAll
);

router.get(
  "/me",
  authenticate,
  me
);

module.exports = router;