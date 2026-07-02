import api from "@/api/axios";

/**
 * Get Tasks
 */
export const getTasks = async ({
  search = "",
  status = "",
  priority = "",
  sort = "newest",
} = {}) => {
  const response = await api.get("/tasks", {
    params: {
      search,
      status,
      priority,
      sort,
    },
  });

  return response.data;
};

/**
 * Get Single Task
 */
export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create Task
 */
export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

/**
 * Update Task
 */
export const updateTask = async ({ id, data }) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

/**
 * Update Task Status
 */
export const updateTaskStatus = async ({ id, status }) => {
  const response = await api.patch(`/tasks/${id}/status`, {
    status,
  });

  return response.data;
};

/**
 * Delete Task
 */
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};