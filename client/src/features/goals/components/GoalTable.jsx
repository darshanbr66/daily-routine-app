import EmptyState from "@/components/common/EmptyState";

import GoalActions from "./GoalActions";
import GoalSkeleton from "./GoalSkeleton";

function GoalTable({
  goals = [],
  isLoading = false,
  search,
  onEdit,
}) {
  if (isLoading) {
    return <GoalSkeleton />;
  }

  const filteredGoals = goals.filter(
    (goal) =>
      goal.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (goal.description || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (filteredGoals.length === 0) {
    return (
      <EmptyState
        title="No Goals Found"
        description="Create your first goal and start tracking your long-term progress."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Goal
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Progress
              </th>

              <th className="px-6 py-4 text-left">
                Target Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredGoals.map((goal) => (
              <tr
                key={goal._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {goal.icon}
                    </span>

                    <span className="font-medium">
                      {goal.title}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {goal.category}
                </td>

                <td className="px-6 py-4">
                  <span className="capitalize">
                    {goal.priority}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="capitalize">
                    {goal.status.replace("-", " ")}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {goal.progress}%
                </td>

                <td className="px-6 py-4">
                  {goal.targetDate
                    ? new Date(
                        goal.targetDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <GoalActions
                    goal={goal}
                    onEdit={onEdit}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GoalTable;