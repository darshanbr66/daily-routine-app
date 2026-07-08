const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../repositories/note.repository");

/**
 * Create Note
 */
const createNoteService = async (
  userId,
  noteData
) => {
  return await createNote({
    ...noteData,
    user: userId,
  });
};

/**
 * Get All Notes
 */
const getNotesService = async (
  userId,
  filters
) => {
  return await getNotes(userId, filters);
};

/**
 * Get Single Note
 */
const getNoteByIdService = async (
  noteId,
  userId
) => {
  const note = await getNoteById(
    noteId,
    userId
  );

  if (!note) {
    throw new Error("Note not found.");
  }

  return note;
};

/**
 * Update Note
 */
const updateNoteService = async (
  noteId,
  userId,
  updateData
) => {
  const note = await updateNote(
    noteId,
    userId,
    updateData
  );

  if (!note) {
    throw new Error("Note not found.");
  }

  return note;
};

/**
 * Delete Note
 */
const deleteNoteService = async (
  noteId,
  userId
) => {
  const note = await deleteNote(
    noteId,
    userId
  );

  if (!note) {
    throw new Error("Note not found.");
  }

  return note;
};

module.exports = {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
};