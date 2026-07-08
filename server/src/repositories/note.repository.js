const Note = require("../models/Note");

/**
 * Create Note
 */
const createNote = async (noteData) => {
  return await Note.create(noteData);
};

/**
 * Get All Notes
 */
const getNotes = async (
  userId,
  filters = {}
) => {
  const query = {
    user: userId,
  };

  if (filters.search) {
    query.$or = [
      {
        title: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        content: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.isPinned !== undefined && filters.isPinned !== "") {
    query.isPinned = filters.isPinned === "true";
  }

  return await Note.find(query).sort({
    isPinned: -1,
    updatedAt: -1,
  });
};

/**
 * Get Note By ID
 */
const getNoteById = async (
  noteId,
  userId
) => {
  return await Note.findOne({
    _id: noteId,
    user: userId,
  });
};

/**
 * Update Note
 */
const updateNote = async (
  noteId,
  userId,
  updateData
) => {
  return await Note.findOneAndUpdate(
    {
      _id: noteId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Delete Note
 */
const deleteNote = async (
  noteId,
  userId
) => {
  return await Note.findOneAndDelete({
    _id: noteId,
    user: userId,
  });
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};