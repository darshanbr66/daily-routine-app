import {
  CheckCircle2,
  Flame,
  ListTodo,
  Trophy,
} from "lucide-react";

import SummaryCard from "@/features/dashboard/components/SummaryCard";

function HabitStats({
  totalHabits,
  completedToday,
  currentBestStreak,
  longestBestStreak,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Habits"
        value={totalHabits}
        icon={
          <ListTodo className="h-6 w-6 text-white" />
        }
        color="bg-blue-500"
      />

      <SummaryCard
        title="Completed Today"
        value={completedToday}
        icon={
          <CheckCircle2 className="h-6 w-6 text-white" />
        }
        color="bg-green-500"
      />

      <SummaryCard
        title="Current Streak"
        value={currentBestStreak}
        icon={
          <Flame className="h-6 w-6 text-white" />
        }
        color="bg-orange-500"
      />

      <SummaryCard
        title="Best Streak"
        value={longestBestStreak}
        icon={
          <Trophy className="h-6 w-6 text-white" />
        }
        color="bg-purple-500"
      />
    </div>
  );
}

export default HabitStats;