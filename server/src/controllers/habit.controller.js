const habitService = require("../services/habit.service");

const createHabit = async (req, res) => {
  try {
    const habit = await habitService.createHabit(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyHabits = async (req, res) => {
  try {
    const habits = await habitService.getMyHabits(
      req.user.id
    );

    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHabitById = async (req, res) => {
  try {
    const habit = await habitService.getHabitById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const habit = await habitService.updateHabit(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      data: habit,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleHabitCompletion = async (
  req,
  res
) => {
  try {
    const habit =
      await habitService.toggleHabitCompletion(
        req.params.id,
        req.user.id
      );

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      data: habit,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const archiveHabit = async (req, res) => {
  try {
    await habitService.archiveHabit(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Habit archived successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getMyHabits,
  getHabitById,
  updateHabit,
  toggleHabitCompletion,
  archiveHabit,
};