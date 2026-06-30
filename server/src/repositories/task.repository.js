const Task = require("../models/Task");

const createTask = (data) => Task.create(data);

const getTasksByUser = (userId) =>
  Task.find({
    user: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

const getTaskById = (taskId, userId) =>
  Task.findOne({
    _id: taskId,
    user: userId,
    isDeleted: false,
  });

const updateTask = (taskId, userId, updateData) =>
  Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
      isDeleted: false,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

const updateTaskStatus = (taskId, userId, updateData) =>
  Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
      isDeleted: false,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

const deleteTask = (taskId, userId) =>
  Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
};