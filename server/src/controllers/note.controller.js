const {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} = require("../services/note.service");

/**
 * Create Note
 * POST /api/v1/notes
 */
const createNote = async (req, res) => {
  try {
    const note = await createNoteService(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: note,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Notes
 * GET /api/v1/notes
 */
const getNotes = async (req, res) => {
  try {
    const notes = await getNotesService(
      req.user.id,
      req.query
    );

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Note
 * GET /api/v1/notes/:id
 */
const getNoteById = async (req, res) => {
  try {
    const note = await getNoteByIdService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Note
 * PUT /api/v1/notes/:id
 */
const updateNote = async (req, res) => {
  try {
    const note = await updateNoteService(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: note,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Note
 * DELETE /api/v1/notes/:id
 */
const deleteNote = async (req, res) => {
  try {
    await deleteNoteService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};