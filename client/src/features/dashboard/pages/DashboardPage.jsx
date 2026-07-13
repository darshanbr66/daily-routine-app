import DashboardHeader from "../components/DashboardHeader";
import DashboardSkeleton from "../components/DashboardSkeleton";
import DueTodayCard from "../components/DueTodayCard";
import RecentNotes from "../components/RecentNotes";
import RoutineSummary from "../components/RoutineSummary";
import StatsGrid from "../components/StatsGrid";
import GoalProgress from "../components/GoalProgress";
import QuickActions from "../components/QuickActions";
import TodayAgenda from "../components/TodayAgenda";

import { useDashboard } from "../hooks/useDashboard";

function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load dashboard.
        </h2>

        <p className="mt-2 text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <DashboardHeader
        summary={data.summary}
      />

      <QuickActions />

      {/* Statistics */}

      <StatsGrid
        stats={data.stats}
      />

      {/* Dashboard Widgets */}

      <div className="grid gap-6 xl:grid-cols-2">

        <TodayAgenda agenda={data.todayAgenda} />
        
        <DueTodayCard
          tasks={data.dueToday}
        />

        <RoutineSummary
          routines={data.routineSummary}
        />

        <RecentNotes
          notes={data.recentNotes}
        />

        <GoalProgress goals={data.goalProgress} />
      </div>
    </div>
  );
}

export default DashboardPage;