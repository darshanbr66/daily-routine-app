function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
    />
  );
}

function RoutineSkeleton() {
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

      {/* Routine Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            {/* Header */}

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkeletonCard className="h-8 w-8 rounded-full" />

                <SkeletonCard className="h-6 w-32" />
              </div>

              <SkeletonCard className="h-6 w-16 rounded-full" />
            </div>

            {/* Description */}

            <SkeletonCard className="mb-2 h-4 w-full" />
            <SkeletonCard className="mb-2 h-4 w-5/6" />
            <SkeletonCard className="mb-6 h-4 w-2/3" />

            {/* Time */}

            <SkeletonCard className="mb-4 h-4 w-28" />

            {/* Repeat Days */}

            <div className="mb-6 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, day) => (
                <SkeletonCard
                  key={day}
                  className="h-6 w-12 rounded-full"
                />
              ))}
            </div>

            {/* Footer */}

            <div className="flex items-center justify-between border-t pt-4">
              <SkeletonCard className="h-4 w-20" />

              <SkeletonCard className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutineSkeleton;