const goalService = require("../services/goal.service");

const createGoal = async (req, res) => {
  try {
    const goal = await goalService.createGoal(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyGoals = async (req, res) => {
  try {
    const goals = await goalService.getMyGoals(
      req.user.id
    );

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGoalById = async (req, res) => {
  try {
    const goal = await goalService.getGoalById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await goalService.updateGoal(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      data: goal,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const archiveGoal = async (req, res) => {
  try {
    await goalService.archiveGoal(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Goal archived successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  archiveGoal,
};