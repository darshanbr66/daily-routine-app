import api from "@/api/axios";

/**
 * Get All Goals
 */
export const getGoals = async () => {
  const response = await api.get("/goals");
  return response.data;
};

/**
 * Get Single Goal
 */
export const getGoalById = async (id) => {
  const response = await api.get(`/goals/${id}`);
  return response.data;
};

/**
 * Create Goal
 */
export const createGoal = async (goal) => {
  const response = await api.post("/goals", goal);
  return response.data;
};

/**
 * Update Goal
 */
export const updateGoal = async ({ id, data }) => {
  const response = await api.put(
    `/goals/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete Goal
 */
export const deleteGoal = async (id) => {
  const response = await api.delete(
    `/goals/${id}`
  );

  return response.data;
};