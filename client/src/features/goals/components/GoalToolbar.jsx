import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GoalToolbar({
  search,
  setSearch,
  onCreateGoal,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative w-full md:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          placeholder="Search goals..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="pl-10"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={onCreateGoal}>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>
    </div>
  );
}

export default GoalToolbar;