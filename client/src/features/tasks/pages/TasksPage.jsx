import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

import TaskDialog from "../components/TaskDialog";
import TaskTable from "../components/TaskTable";
import TaskToolbar from "../components/TaskToolbar";

function TasksPage() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(search, 300);
  const status = searchParams.get("status") || "";
  const priority = searchParams.get("priority") || "";
  const sort = searchParams.get("sort") || "newest";

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "newest") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Tasks</h1>

        <p className="mt-2 text-slate-500">
          Manage all your daily tasks.
        </p>
      </div>

      <TaskToolbar
        search={search}
        setSearch={(value) =>
          updateFilters({ search: value })
        }

        status={status}
        setStatus={(value) =>
          updateFilters({ status: value })
        }

        priority={priority}
        setPriority={(value) =>
          updateFilters({ priority: value })
        }

        sort={sort}
        setSort={(value) =>
          updateFilters({ sort: value })
        }

        onCreateTask={handleCreate}
        onClearFilters={clearFilters}
      />

      <TaskTable
        search={debouncedSearch}
        status={status}
        priority={priority}
        sort={sort}
        onEdit={handleEdit}
      />

      <TaskDialog
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
      />
    </div>
  );
}

export default TasksPage;