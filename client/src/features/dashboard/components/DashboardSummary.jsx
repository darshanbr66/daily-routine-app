import {
  CheckCircle,
  ClipboardList,
  Clock3,
  TrendingUp,
} from "lucide-react";

import SummaryCard from "./SummaryCard";
import DashboardSkeleton from "./DashboardSkeleton";
import { useDashboard } from "../hooks/useDashboard";

function DashboardSummary() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const summary = data?.data;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Tasks"
        value={summary?.totalTasks ?? 0}
        icon={<ClipboardList className="h-8 w-8 text-white" />}
        color="bg-blue-500"
      />

      <SummaryCard
        title="Completed"
        value={summary?.completedTasks ?? 0}
        icon={<CheckCircle className="h-8 w-8 text-white" />}
        color="bg-green-500"
      />

      <SummaryCard
        title="Pending"
        value={summary?.pendingTasks ?? 0}
        icon={<Clock3 className="h-8 w-8 text-white" />}
        color="bg-orange-500"
      />

      <SummaryCard
        title="Completion Rate"
        value={`${summary?.completionRate ?? 0}%`}
        icon={<TrendingUp className="h-8 w-8 text-white" />}
        color="bg-purple-500"
      />
    </div>
  );
}

export default DashboardSummary;