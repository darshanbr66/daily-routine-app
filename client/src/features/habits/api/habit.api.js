import api from "@/api/axios";

/**
 * Get All Habits
 */
export const getHabits = async () => {
  const response = await api.get("/habits");
  return response.data;
};

/**
 * Get Single Habit
 */
export const getHabitById = async (id) => {
  const response = await api.get(`/habits/${id}`);
  return response.data;
};

/**
 * Create Habit
 */
export const createHabit = async (habit) => {
  const response = await api.post("/habits", habit);
  return response.data;
};

/**
 * Update Habit
 */
export const updateHabit = async ({ id, data }) => {
  const response = await api.put(
    `/habits/${id}`,
    data
  );

  return response.data;
};

/**
 * Toggle Habit Completion
 */
export const toggleHabit = async (id) => {
  const response = await api.patch(
    `/habits/${id}/toggle`
  );

  return response.data;
};

/**
 * Delete Habit
 */
export const deleteHabit = async (id) => {
  const response = await api.delete(
    `/habits/${id}`
  );

  return response.data;
};