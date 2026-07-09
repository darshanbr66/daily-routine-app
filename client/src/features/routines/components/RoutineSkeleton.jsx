import { Skeleton } from "@/components/ui/skeleton";

function RoutineSkeleton() {
  return (
    <div className="space-y-6">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <Skeleton className="h-10 w-full md:w-72" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-10 w-40" />
      </div>

      {/* Routine Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            {/* Header */}

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>

              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Description */}

            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="mb-6 h-4 w-2/3" />

            {/* Time */}

            <Skeleton className="mb-3 h-4 w-24" />

            {/* Days */}

            <Skeleton className="mb-6 h-4 w-full" />

            {/* Footer */}

            <div className="flex items-center justify-between border-t pt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutineSkeleton;