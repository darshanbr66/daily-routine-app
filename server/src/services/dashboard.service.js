const dashboardRepository = require("../repositories/dashboard.repository");

class DashboardService {
  async getDashboard(userId) {
    const [
      stats,
      dueToday,
      recentNotes,
      routineSummary,
      goalProgress,
      todayAgenda,
    ] = await Promise.all([
      dashboardRepository.getDashboardStats(userId),
      dashboardRepository.getDueToday(userId),
      dashboardRepository.getRecentNotes(userId),
      dashboardRepository.getRoutineSummary(userId),
      dashboardRepository.getGoalProgress(userId),
      dashboardRepository.getTodayAgenda(userId),
    ]);

    const productivity =
      this.calculateProductivity(stats);

    return {
      summary: {
        greeting: this.getGreeting(),
        currentDate: new Date().toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        ),
        completedToday: stats.tasks.completed,
      },

      stats: {
        ...stats,
        productivity,
      },

      todayAgenda,

      dueToday,

      recentNotes,

      routineSummary,

      goalProgress,
    };
  }

  calculateProductivity(stats) {
    const totalTasks =
      stats.tasks.total;

    if (totalTasks === 0) {
      return 0;
    }

    return Math.round(
      (stats.tasks.completed /
        totalTasks) *
        100
    );
  }

  getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 17) {
      return "Good Afternoon";
    }

    return "Good Evening";
  }
}

module.exports =
  new DashboardService();