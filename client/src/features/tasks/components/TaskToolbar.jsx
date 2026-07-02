import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchBar from "./SearchBar";

function TaskToolbar({
  search,
  setSearch,

  status,
  setStatus,

  priority,
  setPriority,

  sort,
  setSort,

  onCreateTask,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <Select
            value={status || "all"}
            onValueChange={(value) =>
                setStatus(value === "all" ? "" : value)
            }
            >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">
                All Status
                </SelectItem>

                <SelectItem value="todo">
                Todo
                </SelectItem>

                <SelectItem value="in-progress">
                In Progress
                </SelectItem>

                <SelectItem value="completed">
                Completed
                </SelectItem>
            </SelectContent>
            </Select>

        <Select
            value={priority || "all"}
            onValueChange={(value) =>
                setPriority(value === "all" ? "" : value)
            }
            >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Priority" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">
                All Priority
                </SelectItem>

                <SelectItem value="high">
                High
                </SelectItem>

                <SelectItem value="medium">
                Medium
                </SelectItem>

                <SelectItem value="low">
                Low
                </SelectItem>
            </SelectContent>
            </Select>

        <Select
            value={sort}
            onValueChange={setSort}
            >
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="newest">
                Newest
                </SelectItem>

                <SelectItem value="oldest">
                Oldest
                </SelectItem>

                <SelectItem value="dueDate">
                Due Date
                </SelectItem>

                <SelectItem value="title">
                Title
                </SelectItem>
            </SelectContent>
            </Select>

        <Button
          variant="outline"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>

      <Button onClick={onCreateTask}>
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
}

export default TaskToolbar;