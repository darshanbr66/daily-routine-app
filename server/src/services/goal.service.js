const goalRepository = require("../repositories/goal.repository");

const createGoal = async (userId, body) => {
  return await goalRepository.createGoal({
    ...body,
    user: userId,
  });
};

const getMyGoals = async (userId) => {
  return await goalRepository.getGoals(userId);
};

const getGoalById = async (goalId, userId) => {
  const goal = await goalRepository.getGoalById(
    goalId,
    userId
  );

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
};

const updateGoal = async (
  goalId,
  userId,
  body
) => {
  const goal = await goalRepository.updateGoal(
    goalId,
    userId,
    body
  );

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
};

const archiveGoal = async (
  goalId,
  userId
) => {
  const goal = await goalRepository.archiveGoal(
    goalId,
    userId
  );

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
};

module.exports = {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  archiveGoal,
};