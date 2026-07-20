import { Loader2 } from "lucide-react";

function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingState;