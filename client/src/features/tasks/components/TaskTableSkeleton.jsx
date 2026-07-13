function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
    />
  );
}

function TaskTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <SkeletonCard className="h-10 w-full md:w-72" />
          <SkeletonCard className="h-10 w-40" />
          <SkeletonCard className="h-10 w-40" />
          <SkeletonCard className="h-10 w-32" />
        </div>

        <SkeletonCard className="h-10 w-40" />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Header */}

        <div className="grid grid-cols-7 gap-4 border-b p-4">
          <SkeletonCard className="h-5 w-20" />
          <SkeletonCard className="h-5 w-28" />
          <SkeletonCard className="h-5 w-24" />
          <SkeletonCard className="h-5 w-24" />
          <SkeletonCard className="h-5 w-24" />
          <SkeletonCard className="h-5 w-20" />
          <SkeletonCard className="h-5 w-16" />
        </div>

        {/* Rows */}

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 border-b p-4 last:border-0"
          >
            <SkeletonCard className="h-5 w-28" />
            <SkeletonCard className="h-5 w-24" />
            <SkeletonCard className="h-5 w-20" />
            <SkeletonCard className="h-5 w-20" />
            <SkeletonCard className="h-5 w-24" />
            <SkeletonCard className="h-5 w-20" />
            <SkeletonCard className="h-5 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTableSkeleton;