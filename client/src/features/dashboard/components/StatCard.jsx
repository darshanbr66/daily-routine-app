import { Link } from "react-router-dom";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-indigo-600",
  iconBg = "bg-indigo-100",
  to = "#",
}) {
  return (
    <Link
      to={to}
      className="group block rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            className={`h-6 w-6 ${iconColor}`}
          />
        </div>
      </div>
    </Link>
  );
}

export default StatCard;