const Task = require("../models/Task");

const getTaskSummary = async (userId) => {
  const totalTasks = await Task.countDocuments({
    user: userId,
    isDeleted: false,
  });

  const completedTasks = await Task.countDocuments({
    user: userId,
    status: "completed",
    isDeleted: false,
  });

  const pendingTasks = await Task.countDocuments({
    user: userId,
    status: "todo",
    isDeleted: false,
  });

  const inProgressTasks = await Task.countDocuments({
    user: userId,
    status: "in-progress",
    isDeleted: false,
  });

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
  };
};

module.exports = {
  getTaskSummary,
};