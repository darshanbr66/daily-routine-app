import { useState } from "react";

import GoalDialog from "../components/GoalDialog";
import GoalStats from "../components/GoalStats";
import GoalTable from "../components/GoalTable";
import GoalToolbar from "../components/GoalToolbar";

import { useGoals } from "../hooks/useGoals";

function GoalsPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const { data, isLoading } = useGoals();

  const goals = data?.data || [];

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const activeGoals = goals.filter(
    (goal) =>
      goal.status === "in-progress" ||
      goal.status === "not-started"
  ).length;

  const completionRate =
    goals.length > 0
      ? Math.round(
          (completedGoals / goals.length) * 100
        )
      : 0;

  const handleCreateGoal = () => {
    setSelectedGoal(null);
    setDialogOpen(true);
  };

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Goals
        </h1>

        <p className="text-muted-foreground">
          Plan, track and achieve your long-term
          goals.
        </p>
      </div>

      {/* Statistics */}
      <GoalStats
        totalGoals={goals.length}
        completedGoals={completedGoals}
        activeGoals={activeGoals}
        completionRate={completionRate}
      />

      {/* Toolbar */}
      <GoalToolbar
        search={search}
        setSearch={setSearch}
        onCreateGoal={handleCreateGoal}
      />

      {/* Table */}
      <GoalTable
        goals={goals}
        isLoading={isLoading}
        search={search}
        onEdit={handleEditGoal}
      />

      {/* Dialog */}
      <GoalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        goal={selectedGoal}
      />
    </div>
  );
}

export default GoalsPage;