const express = require("express");

const router = express.Router();

const {
  authenticate,
} = require("../middleware/auth.middleware");

const {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routine.controller");

/**
 * All Routine Routes require authentication
 */
router.use(authenticate);

/**
 * Create & Get All
 */
router
  .route("/")
  .post(createRoutine)
  .get(getRoutines);

/**
 * Get One / Update / Delete
 */
router
  .route("/:id")
  .get(getRoutineById)
  .put(updateRoutine)
  .delete(deleteRoutine);

module.exports = router;