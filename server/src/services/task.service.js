const taskRepository = require("../repositories/task.repository");

const createTask = async (userId, body) => {
  return await taskRepository.createTask({
    ...body,
    user: userId,
  });
};

const getMyTasks = async (userId) => {
  return await taskRepository.getTasksByUser(userId);
};

const getTaskById = async (taskId, userId) => {
  const task = await taskRepository.getTaskById(taskId, userId);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

const updateTask = async (taskId, userId, body) => {
  const task = await taskRepository.updateTask(taskId, userId, body);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

const updateTaskStatus = async (taskId, userId, status) => {
  const updateData = {
    status,
    completedAt: status === "completed" ? new Date() : null,
  };

  const task = await taskRepository.updateTaskStatus(
    taskId,
    userId,
    updateData
  );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await taskRepository.deleteTask(taskId, userId);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

module.exports = {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
};