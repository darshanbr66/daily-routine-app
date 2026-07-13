function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="space-y-3">
        <SkeletonCard className="h-9 w-80" />
        <SkeletonCard className="h-5 w-60" />
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <SkeletonCard className="mb-4 h-5 w-24" />

            <SkeletonCard className="mb-2 h-10 w-16" />

            <SkeletonCard className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Dashboard Widgets */}

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <SkeletonCard className="mb-5 h-6 w-40" />

            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, item) => (
                <SkeletonCard
                  key={item}
                  className="h-4 w-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;