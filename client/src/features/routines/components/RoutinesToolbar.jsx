import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RoutinesToolbar({
  search,
  onSearchChange,

  timeOfDay,
  onTimeOfDayChange,

  isActive,
  onIsActiveChange,

  onCreateRoutine,
  onClearFilters,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}

        <Input
          placeholder="Search routines..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="md:max-w-sm"
        />

        {/* Time of Day */}

        <select
          value={timeOfDay}
          onChange={(e) =>
            onTimeOfDayChange(
              e.target.value
            )
          }
          className="h-10 rounded-md border px-3"
        >
          <option value="">
            All Times
          </option>

          <option value="morning">
            Morning
          </option>

          <option value="afternoon">
            Afternoon
          </option>

          <option value="evening">
            Evening
          </option>

          <option value="night">
            Night
          </option>

          <option value="custom">
            Custom
          </option>
        </select>

        {/* Active */}

        <select
          value={isActive}
          onChange={(e) =>
            onIsActiveChange(
              e.target.value
            )
          }
          className="h-10 rounded-md border px-3"
        >
          <option value="">
            All Routines
          </option>

          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>
        </select>

        <Button
          variant="outline"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>

      <Button
        onClick={onCreateRoutine}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Routine
      </Button>
    </div>
  );
}

export default RoutinesToolbar;