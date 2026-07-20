import { Link } from "react-router-dom";

function PageHeader({
  title,
  description,
  icon: Icon,
  actionLabel,
  actionTo,
  action,
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <Icon className="text-2xl text-indigo-600" />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right */}

      {action ? (
        action
      ) : (
        actionLabel &&
        actionTo && (
          <Link
            to={actionTo}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {actionLabel}
          </Link>
        )
      )}
    </div>
  );
}

export default PageHeader;