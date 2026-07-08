import api from "@/api/axios";

/**
 * Get Notes
 */
export const getNotes = async ({
  search = "",
  category = "",
  isPinned = "",
} = {}) => {
  const response = await api.get("/notes", {
    params: {
      search,
      category,
      isPinned,
    },
  });

  return response.data;
};

/**
 * Get Single Note
 */
export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);

  return response.data;
};

/**
 * Create Note
 */
export const createNote = async (note) => {
  const response = await api.post(
    "/notes",
    note
  );

  return response.data;
};

/**
 * Update Note
 */
export const updateNote = async ({
  id,
  data,
}) => {
  const response = await api.put(
    `/notes/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete Note
 */
export const deleteNote = async (id) => {
  const response = await api.delete(
    `/notes/${id}`
  );

  return response.data;
};