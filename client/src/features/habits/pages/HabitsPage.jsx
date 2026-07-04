import { useState } from "react";

import HabitDialog from "../components/HabitDialog";
import HabitStats from "../components/HabitStats";
import HabitTable from "../components/HabitTable";
import HabitToolbar from "../components/HabitToolbar";

import { useHabits } from "../hooks/useHabits";

function HabitsPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedHabit, setSelectedHabit] =
    useState(null);

  const { data, isLoading } = useHabits();

  const habits = data?.data || [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedToday = habits.filter(
    (habit) =>
      habit.completedDates?.some((date) => {
        const completed = new Date(date);

        completed.setHours(0, 0, 0, 0);

        return (
          completed.getTime() ===
          today.getTime()
        );
      })
  ).length;

  const currentBestStreak =
    habits.length > 0
      ? Math.max(
          ...habits.map(
            (habit) =>
              habit.currentStreak || 0
          )
        )
      : 0;

  const longestBestStreak =
    habits.length > 0
      ? Math.max(
          ...habits.map(
            (habit) =>
              habit.bestStreak || 0
          )
        )
      : 0;

  const handleCreateHabit = () => {
    setSelectedHabit(null);
    setDialogOpen(true);
  };

  const handleEditHabit = (habit) => {
    setSelectedHabit(habit);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Habits
        </h1>

        <p className="text-muted-foreground">
          Build consistency by tracking your daily
          habits.
        </p>
      </div>

      {/* Statistics */}
      <HabitStats
        totalHabits={habits.length}
        completedToday={completedToday}
        currentBestStreak={
          currentBestStreak
        }
        longestBestStreak={
          longestBestStreak
        }
      />

      {/* Toolbar */}
      <HabitToolbar
        search={search}
        setSearch={setSearch}
        onCreateHabit={
          handleCreateHabit
        }
      />

      {/* Table */}
      <HabitTable
        habits={habits}
        isLoading={isLoading}
        search={search}
        onEdit={handleEditHabit}
      />

      {/* Dialog */}
      <HabitDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        habit={selectedHabit}
      />
    </div>
  );
}

export default HabitsPage;