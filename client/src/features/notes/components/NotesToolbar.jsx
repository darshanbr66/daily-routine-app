import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function NotesToolbar({
  search,
  onSearchChange,

  category,
  onCategoryChange,

  pinnedFilter,
  onPinnedFilterChange,

  onCreateNote,
  onClearFilters,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}

        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="md:max-w-sm"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="h-10 rounded-md border px-3"
        >
          <option value="">
            All Categories
          </option>

          <option value="personal">
            Personal
          </option>

          <option value="work">
            Work
          </option>

          <option value="study">
            Study
          </option>

          <option value="ideas">
            Ideas
          </option>

          <option value="other">
            Other
          </option>
        </select>

        {/* Pinned */}

        <select
          value={pinnedFilter}
          onChange={(e) =>
            onPinnedFilterChange(
              e.target.value
            )
          }
          className="h-10 rounded-md border px-3"
        >
          <option value="">
            All Notes
          </option>

          <option value="true">
            Pinned
          </option>

          <option value="false">
            Unpinned
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
        onClick={onCreateNote}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Note
      </Button>
    </div>
  );
}

export default NotesToolbar;