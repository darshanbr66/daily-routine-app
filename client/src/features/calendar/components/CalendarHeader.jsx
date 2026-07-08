import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Calendar
        </h1>

        <p className="text-sm text-slate-500">
          Plan your schedule and manage upcoming events.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-[170px] text-center text-lg font-semibold">
          {monthYear}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button onClick={onToday}>
          Today
        </Button>
      </div>
    </div>
  );
}

export default CalendarHeader;