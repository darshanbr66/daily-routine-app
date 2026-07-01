const dashboardRepository = require("../repositories/dashboard.repository");

const getSummary = async (userId) => {
  const summary = await dashboardRepository.getTaskSummary(userId);

  const completionRate =
    summary.totalTasks === 0
      ? 0
      : Number(
          (
            (summary.completedTasks / summary.totalTasks) *
            100
          ).toFixed(2)
        );

  return {
    ...summary,
    completionRate,
  };
};

module.exports = {
  getSummary,
};