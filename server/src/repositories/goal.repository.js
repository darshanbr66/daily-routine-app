const Goal = require("../models/Goal");

const createGoal = async (goalData) => {
  return Goal.create(goalData);
};

const getGoals = async (userId) => {
  return Goal.find({
    user: userId,
    isArchived: false,
  }).sort({ createdAt: -1 });
};

const getGoalById = async (goalId, userId) => {
  return Goal.findOne({
    _id: goalId,
    user: userId,
    isArchived: false,
  });
};

const updateGoal = async (
  goalId,
  userId,
  updateData
) => {
  return Goal.findOneAndUpdate(
    {
      _id: goalId,
      user: userId,
      isArchived: false,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const archiveGoal = async (
  goalId,
  userId
) => {
  return Goal.findOneAndUpdate(
    {
      _id: goalId,
      user: userId,
    },
    {
      isArchived: true,
    },
    {
      new: true,
    }
  );
};

module.exports = {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  archiveGoal,
};