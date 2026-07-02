import { Skeleton } from "@/components/ui/skeleton";

function TaskTableSkeleton() {
  return (
    <div className="rounded-lg border">
      <div className="border-b p-4">
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="space-y-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4"
          >
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTableSkeleton;