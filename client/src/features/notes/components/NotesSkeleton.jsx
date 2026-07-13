function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 ${className}`}
    />
  );
}

function NotesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SkeletonCard className="h-10 w-full sm:w-72" />
          <SkeletonCard className="h-10 w-40" />
          <SkeletonCard className="h-10 w-40" />
        </div>

        <SkeletonCard className="h-10 w-36" />
      </div>

      {/* Notes */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            {/* Title */}

            <SkeletonCard className="mb-4 h-6 w-2/3" />

            {/* Content */}

            <SkeletonCard className="mb-2 h-4 w-full" />
            <SkeletonCard className="mb-2 h-4 w-5/6" />
            <SkeletonCard className="mb-2 h-4 w-3/4" />
            <SkeletonCard className="mb-6 h-4 w-2/3" />

            {/* Footer */}

            <div className="flex items-center justify-between border-t pt-4">
              <SkeletonCard className="h-6 w-20 rounded-full" />

              <SkeletonCard className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesSkeleton;