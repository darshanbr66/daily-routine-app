const Task = require("../models/Task");

const createTask = (data) => Task.create(data);

const getTasksByUser = (
  userId,
  search = "",
  status = "",
  priority = "",
  sort = "newest"
) => {
  const query = {
    user: userId,
    isDeleted: false,
  };

  // Search by title or description
  if (search.trim()) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filter by status
  if (status) {
    query.status = status;
  }

  // Filter by priority
  if (priority) {
    query.priority = priority;
  }

  // Sorting
  let sortQuery = {
    createdAt: -1,
  };

  switch (sort) {
    case "oldest":
      sortQuery = {
        createdAt: 1,
      };
      break;

    case "dueDate":
      sortQuery = {
        dueDate: 1,
      };
      break;

    case "priority":
      sortQuery = {
        priority: -1,
      };
      break;

    case "title":
      sortQuery = {
        title: 1,
      };
      break;

    case "newest":
    default:
      sortQuery = {
        createdAt: -1,
      };
      break;
  }

  return Task.find(query).sort(sortQuery);
};

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