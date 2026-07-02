import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-72" />
        <Skeleton className="mt-3 h-5 w-52" />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-6 shadow-sm"
          >
            <Skeleton className="h-5 w-28" />

            <Skeleton className="mt-6 h-10 w-16" />

            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;