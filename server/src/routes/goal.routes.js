const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const goalController = require("../controllers/goal.controller");

/**
 * Create Goal
 */
router.post(
  "/",
  authenticate,
  goalController.createGoal
);

/**
 * Get All Goals
 */
router.get(
  "/",
  authenticate,
  goalController.getMyGoals
);

/**
 * Get Goal By ID
 */
router.get(
  "/:id",
  authenticate,
  goalController.getGoalById
);

/**
 * Update Goal
 */
router.put(
  "/:id",
  authenticate,
  goalController.updateGoal
);

/**
 * Archive Goal (Soft Delete)
 */
router.delete(
  "/:id",
  authenticate,
  goalController.archiveGoal
);

module.exports = router;