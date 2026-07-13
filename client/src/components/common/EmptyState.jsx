import { Link } from "react-router-dom";

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-8 py-16 text-center shadow-sm">
      {/* Icon */}

      {Icon && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <Icon className="text-4xl text-slate-500" />
        </div>
      )}

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {/* Action */}

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;