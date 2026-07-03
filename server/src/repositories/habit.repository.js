const Habit = require("../models/Habit");

const createHabit = async (habitData) => {
  return Habit.create(habitData);
};

const getHabits = async (userId) => {
  return Habit.find({
    user: userId,
    isArchived: false,
  }).sort({ createdAt: -1 });
};

const getHabitById = async (habitId, userId) => {
  return Habit.findOne({
    _id: habitId,
    user: userId,
    isArchived: false,
  });
};

const updateHabit = async (
  habitId,
  userId,
  updateData
) => {
  return Habit.findOneAndUpdate(
    {
      _id: habitId,
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

const archiveHabit = async (
  habitId,
  userId
) => {
  return Habit.findOneAndUpdate(
    {
      _id: habitId,
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

const saveHabit = async (habit) => {
  return habit.save();
};

module.exports = {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  archiveHabit,
  saveHabit,
};