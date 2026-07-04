import {
  CheckCircle2,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import SummaryCard from "@/features/dashboard/components/SummaryCard";

function GoalStats({
  totalGoals,
  completedGoals,
  activeGoals,
  completionRate,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Goals"
        value={totalGoals}
        icon={
          <Target className="h-6 w-6 text-white" />
        }
        color="bg-blue-500"
      />

      <SummaryCard
        title="Completed"
        value={completedGoals}
        icon={
          <CheckCircle2 className="h-6 w-6 text-white" />
        }
        color="bg-green-500"
      />

      <SummaryCard
        title="Active Goals"
        value={activeGoals}
        icon={
          <TrendingUp className="h-6 w-6 text-white" />
        }
        color="bg-orange-500"
      />

      <SummaryCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={
          <Trophy className="h-6 w-6 text-white" />
        }
        color="bg-purple-500"
      />
    </div>
  );
}

export default GoalStats;