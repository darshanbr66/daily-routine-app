import { FaExclamationTriangle } from "react-icons/fa";

function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the requested information. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-8 py-16 text-center shadow-sm">
      {/* Icon */}

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <FaExclamationTriangle className="text-4xl text-red-600" />
      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold text-red-700">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-red-600">
        {description}
      </p>

      {/* Retry Button */}

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-8 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;