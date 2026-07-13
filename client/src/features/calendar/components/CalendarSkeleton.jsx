function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
    />
  );
}

function CalendarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Calendar Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <SkeletonCard className="h-10 w-56" />

          <div className="flex gap-2">
            <SkeletonCard className="h-10 w-10 rounded-full" />
            <SkeletonCard className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="flex gap-3">
          <SkeletonCard className="h-10 w-32" />
          <SkeletonCard className="h-10 w-28" />
        </div>
      </div>

      {/* Calendar */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Week Days */}

        <div className="grid grid-cols-7 gap-px border-b bg-slate-100 p-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="text-center"
              >
                <SkeletonCard className="mx-auto h-4 w-10" />
              </div>
            )
          )}
        </div>

        {/* Calendar Grid */}

        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {Array.from({ length: 42 }).map(
            (_, index) => (
              <div
                key={index}
                className="min-h-[110px] bg-white p-3"
              >
                <SkeletonCard className="mb-4 h-5 w-5 rounded-full" />

                <SkeletonCard className="mb-2 h-3 w-full" />

                <SkeletonCard className="mb-2 h-3 w-5/6" />

                <SkeletonCard className="h-3 w-2/3" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarSkeleton;