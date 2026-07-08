import { Skeleton } from "@/components/ui/skeleton";

function NotesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <Skeleton className="h-10 w-full sm:w-72" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      {/* Notes Grid */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <Skeleton className="mb-4 h-6 w-2/3" />

            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="mb-6 h-4 w-2/3" />

            <div className="flex items-center justify-between border-t pt-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesSkeleton;