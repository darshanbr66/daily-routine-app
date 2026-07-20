const express = require("express");

const router = express.Router();

const {
  authenticate,
} = require("../middleware/auth.middleware");

const eventController = require("../controllers/event.controller");

/**
 * Create Event
 */
router.post(
  "/",
  authenticate,
  eventController.createEvent
);

/**
 * Get All Events
 */
router.get(
  "/",
  authenticate,
  eventController.getMyEvents
);

/**
 * Get Event By ID
 */
router.get(
  "/:id",
  authenticate,
  eventController.getEventById
);

/**
 * Update Event
 */
router.put(
  "/:id",
  authenticate,
  eventController.updateEvent
);

/**
 * Delete Event
 */
router.delete(
  "/:id",
  authenticate,
  eventController.deleteEvent
);

module.exports = router;