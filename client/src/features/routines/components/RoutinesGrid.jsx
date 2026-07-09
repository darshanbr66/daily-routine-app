import EmptyState from "@/components/common/EmptyState";

import RoutineCard from "./RoutineCard";

function RoutinesGrid({
  routines = [],
  onRoutineClick,
}) {
  if (!routines.length) {
    return (
      <EmptyState
        title="No Routines Found"
        description="Create your first routine to get started."
      />
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {routines.map((routine) => (
        <RoutineCard
          key={routine._id}
          routine={routine}
          onClick={onRoutineClick}
        />
      ))}
    </div>
  );
}

export default RoutinesGrid;