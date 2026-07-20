const express = require("express");

const router = express.Router();

const {
  authenticate,
} = require("../middleware/auth.middleware");

const habitController = require("../controllers/habit.controller");

/**
 * Create Habit
 */
router.post(
  "/",
  authenticate,
  habitController.createHabit
);

/**
 * Get All Habits
 */
router.get(
  "/",
  authenticate,
  habitController.getMyHabits
);

/**
 * Get Habit By ID
 */
router.get(
  "/:id",
  authenticate,
  habitController.getHabitById
);

/**
 * Update Habit
 */
router.put(
  "/:id",
  authenticate,
  habitController.updateHabit
);

/**
 * Toggle Habit Completion
 */
router.patch(
  "/:id/toggle",
  authenticate,
  habitController.toggleHabitCompletion
);

/**
 * Archive Habit (Soft Delete)
 */
router.delete(
  "/:id",
  authenticate,
  habitController.archiveHabit
);

module.exports = router;