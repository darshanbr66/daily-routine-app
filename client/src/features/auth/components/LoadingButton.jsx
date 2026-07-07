import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  className = "",
  ...props
}) {
  return (
    <Button
      className={`h-11 w-full ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default LoadingButton;