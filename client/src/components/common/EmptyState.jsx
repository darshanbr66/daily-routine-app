import { Button } from "@/components/ui/button";

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
      {icon && (
        <div className="mb-5 text-slate-400">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {buttonText && (
        <Button
          className="mt-6"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;