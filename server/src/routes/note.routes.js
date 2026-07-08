const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

/**
 * All note routes require authentication
 */
router.use(authenticate);

/**
 * Create & Get All
 */
router
  .route("/")
  .post(createNote)
  .get(getNotes);

/**
 * Get One / Update / Delete
 */
router
  .route("/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;