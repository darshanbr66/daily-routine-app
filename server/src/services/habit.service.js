const habitRepository = require("../repositories/habit.repository");

const createHabit = async (userId, body) => {
  return await habitRepository.createHabit({
    ...body,
    user: userId,
  });
};

const getMyHabits = async (userId) => {
  return await habitRepository.getHabits(userId);
};

const getHabitById = async (habitId, userId) => {
  const habit = await habitRepository.getHabitById(
    habitId,
    userId
  );

  if (!habit) {
    throw new Error("Habit not found");
  }

  return habit;
};

const updateHabit = async (
  habitId,
  userId,
  body
) => {
  const habit = await habitRepository.updateHabit(
    habitId,
    userId,
    body
  );

  if (!habit) {
    throw new Error("Habit not found");
  }

  return habit;
};

const toggleHabitCompletion = async (
  habitId,
  userId
) => {
  const habit = await habitRepository.getHabitById(
    habitId,
    userId
  );

  if (!habit) {
    throw new Error("Habit not found");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedToday = habit.completedDates.some(
    (date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);

      return (
        completedDate.getTime() ===
        today.getTime()
      );
    }
  );

  if (completedToday) {
    habit.completedDates =
      habit.completedDates.filter((date) => {
        const completedDate = new Date(date);
        completedDate.setHours(0, 0, 0, 0);

        return (
          completedDate.getTime() !==
          today.getTime()
        );
      });

    habit.currentStreak = Math.max(
      habit.currentStreak - 1,
      0
    );
  } else {
    habit.completedDates.push(today);

    habit.currentStreak += 1;

    if (
      habit.currentStreak >
      habit.bestStreak
    ) {
      habit.bestStreak =
        habit.currentStreak;
    }
  }

  await habitRepository.saveHabit(habit);

  return habit;
};

const archiveHabit = async (
  habitId,
  userId
) => {
  const habit = await habitRepository.archiveHabit(
    habitId,
    userId
  );

  if (!habit) {
    throw new Error("Habit not found");
  }

  return habit;
};

module.exports = {
  createHabit,
  getMyHabits,
  getHabitById,
  updateHabit,
  toggleHabitCompletion,
  archiveHabit,
};