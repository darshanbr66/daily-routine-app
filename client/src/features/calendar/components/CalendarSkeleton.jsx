import { Skeleton } from "@/components/ui/skeleton";

function CalendarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />

      <div className="grid grid-cols-7 gap-px rounded-lg border overflow-hidden">
        {Array.from({ length: 42 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 rounded-none"
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarSkeleton;