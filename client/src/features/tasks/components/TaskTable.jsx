import {
  ClipboardList,
  Search,
  CheckSquare,
  Square,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";

import { useTasks } from "../hooks/useTasks";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";

import DueDateBadge from "./DueDateBadge";
import TaskActions from "./TaskActions";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskTableSkeleton from "./TaskTableSkeleton";

function TaskTable({
  search,
  status,
  priority,
  sort,
  onEdit,
}) {
  const { data, isLoading } = useTasks({
    search,
    status,
    priority,
    sort,
  });

  const updateTaskStatusMutation =
    useUpdateTaskStatus();

  const toggleTaskStatus = (task) => {
    const newStatus =
      task.status === "completed"
        ? "todo"
        : "completed";

    updateTaskStatusMutation.mutate({
      id: task._id,
      status: newStatus,
    });
  };

  if (isLoading) {
    return <TaskTableSkeleton />;
  }

  const tasks = data?.data || [];

  if (tasks.length === 0) {
    const hasFilters =
      search ||
      status ||
      priority ||
      sort !== "newest";

    return (
      <EmptyState
        icon={
          hasFilters ? (
            <Search size={64} />
          ) : (
            <ClipboardList size={64} />
          )
        }
        title={
          hasFilters
            ? "No Tasks Found"
            : "No Tasks Yet"
        }
        description={
          hasFilters
            ? "No tasks match your current search or filters."
            : "Start organizing your day by creating your first task."
        }
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
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Due Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        toggleTaskStatus(task)
                      }
                      className="text-green-600 hover:text-green-700"
                      title="Toggle Complete"
                    >
                      {task.status ===
                      "completed" ? (
                        <CheckSquare size={22} />
                      ) : (
                        <Square size={22} />
                      )}
                    </button>

                    <span
                      className={
                        task.status ===
                        "completed"
                          ? "font-medium text-slate-500 line-through"
                          : "font-medium"
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <TaskPriorityBadge
                    priority={task.priority}
                  />
                </td>

                <td className="px-6 py-4">
                  <TaskStatusBadge
                    status={task.status}
                  />
                </td>

                <td className="px-6 py-4">
                  <DueDateBadge
                    dueDate={task.dueDate}
                  />
                </td>

                <td className="px-6 py-4">
                  <TaskActions
                    task={task}
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

export default TaskTable;