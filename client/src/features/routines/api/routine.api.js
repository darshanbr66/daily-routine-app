import api from "@/api/axios";

/**
 * Get Routines
 */
export const getRoutines = async ({
  search = "",
  timeOfDay = "",
  isActive = "",
} = {}) => {
  const response = await api.get("/routines", {
    params: {
      search,
      timeOfDay,
      isActive,
    },
  });

  return response.data;
};

/**
 * Get Routine By ID
 */
export const getRoutineById = async (id) => {
  const response = await api.get(`/routines/${id}`);

  return response.data;
};

/**
 * Create Routine
 */
export const createRoutine = async (routine) => {
  const response = await api.post(
    "/routines",
    routine
  );

  return response.data;
};

/**
 * Update Routine
 */
export const updateRoutine = async ({
  id,
  data,
}) => {
  const response = await api.put(
    `/routines/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete Routine
 */
export const deleteRoutine = async (id) => {
  const response = await api.delete(
    `/routines/${id}`
  );

  return response.data;
};