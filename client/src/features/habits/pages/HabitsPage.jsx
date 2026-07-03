import { useState } from "react";

import HabitToolbar from "../components/HabitToolbar";
import HabitTable from "../components/HabitTable";
import HabitDialog from "../components/HabitDialog";

function HabitsPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedHabit, setSelectedHabit] =
    useState(null);

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

      {/* Toolbar */}
      <HabitToolbar
        search={search}
        setSearch={setSearch}
        onCreateHabit={handleCreateHabit}
      />

      {/* Table */}
      <HabitTable
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