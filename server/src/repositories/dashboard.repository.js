const Task = require("../models/Task");
const Habit = require("../models/Habit");
const Goal = require("../models/Goal");
const Note = require("../models/Note");
const Routine = require("../models/Routine");

class DashboardRepository {
  async getDashboardStats(userId) {
    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,

      totalHabits,
      activeHabits,

      totalGoals,
      completedGoals,

      totalNotes,

      totalRoutines,
      activeRoutines,
    ] = await Promise.all([
      Task.countDocuments({ user: userId }),

      Task.countDocuments({
        user: userId,
        status: "completed",
      }),

      Task.countDocuments({
        user: userId,
        status: "todo",
      }),

      Task.countDocuments({
        user: userId,
        dueDate: { $lt: new Date() },
        status: { $ne: "completed" },
      }),

      Habit.countDocuments({
        user: userId,
      }),

      Habit.countDocuments({
        user: userId,
        isActive: true,
      }),

      Goal.countDocuments({
        user: userId,
      }),

      Goal.countDocuments({
        user: userId,
        status: "completed",
      }),

      Note.countDocuments({
        user: userId,
      }),

      Routine.countDocuments({
        user: userId,
      }),

      Routine.countDocuments({
        user: userId,
        isActive: true,
      }),
    ]);

    return {
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        overdue: overdueTasks,
      },

      habits: {
        total: totalHabits,
        active: activeHabits,
      },

      goals: {
        total: totalGoals,
        completed: completedGoals,
      },

      notes: {
        total: totalNotes,
      },

      routines: {
        total: totalRoutines,
        active: activeRoutines,
      },
    };
  }

  async getDueToday(userId) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    return Task.find({
      user: userId,
      isDeleted: false,
      status: { $ne: "completed" },
      $or: [
        {
          dueDate: {
            $lt: tomorrow,
          },
        },
      ],
    })
      .sort({
        dueDate: 1,
        priority: -1,
      })
      .limit(5)
      .lean();
  }

  async getRecentNotes(userId) {
    const notes = await Note.find({
      user: userId,
    })
      .sort({
        updatedAt: -1,
      })
      .limit(5)
      .lean();

    return notes.map((note) => ({
      _id: note._id,

      title: note.title,

      preview:
        note.content.length > 120
          ? `${note.content.substring(
              0,
              120
            )}...`
          : note.content,

      category: note.category,

      color: note.color,

      isPinned: note.isPinned,

      updatedAt: note.updatedAt,
    }));
  }

  async getRoutineSummary(userId) {
    return Routine.find({
      user: userId,
      isActive: true,
    })
      .select(
        "name icon color timeOfDay repeatDays"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .lean();
  }

  async getGoalProgress(userId) {
    return Goal.find({
      user: userId,
      isArchived: false,
    })
      .select(
        "title progress status priority targetDate color icon"
      )
      .sort({
        progress: -1,
        targetDate: 1,
      })
      .limit(5)
      .lean();
  }

  async getTodayAgenda(userId) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayName = today
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toLowerCase();

    const [tasks, routines] = await Promise.all([
      Task.find({
        user: userId,
        isDeleted: false,
        status: { $ne: "completed" },
        dueDate: {
          $gte: today,
          $lt: tomorrow,
        },
      })
        .select("title priority dueDate")
        .lean(),

      Routine.find({
        user: userId,
        isActive: true,
        repeatDays: todayName,
      })
        .select(
          "name icon color timeOfDay"
        )
        .lean(),
    ]);

    return [
      ...routines.map((routine) => ({
        id: routine._id,
        type: "routine",
        title: routine.name,
        time: routine.timeOfDay,
        icon: routine.icon,
        color: routine.color,
      })),

      ...tasks.map((task) => ({
        id: task._id,
        type: "task",
        title: task.title,
        priority: task.priority,
        dueDate: task.dueDate,
      })),
    ];
  }
}

module.exports =
  new DashboardRepository();