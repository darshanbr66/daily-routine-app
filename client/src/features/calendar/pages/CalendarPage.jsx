import { useMemo, useState } from "react";

import CalendarHeader from "../components/CalendarHeader";
import CalendarGrid from "../components/CalendarGrid";
import CalendarSkeleton from "../components/CalendarSkeleton";
import EventDialog from "../components/EventDialog";
import DeleteEventDialog from "../components/DeleteEventDialog";

import { useEvents } from "../hooks/useEvents";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(null);

  const [editingEvent, setEditingEvent] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDate = useMemo(
    () =>
      new Date(year, month, 1)
        .toISOString()
        .split("T")[0],
    [year, month]
  );

  const endDate = useMemo(
    () =>
      new Date(year, month + 1, 0)
        .toISOString()
        .split("T")[0],
    [year, month]
  );

  const { data, isLoading, isError } = useEvents({
    startDate,
    endDate,
  });

  const createEventMutation = useCreateEvent();

  const updateEventMutation = useUpdateEvent();

  const events = data?.data ?? [];

  const resetDialogState = () => {
    setDialogOpen(false);
    setDeleteDialogOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    resetDialogState();
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    resetDialogState();
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date) => {
    setEditingEvent(null);
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleEventClick = (event) => {
    setEditingEvent(event);
    setSelectedDate(new Date(event.date));
    setDialogOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingEvent) {
      updateEventMutation.mutate(
        {
          id: editingEvent._id,
          data: formData,
        },
        {
          onSuccess: () => {
            resetDialogState();
          },
        }
      );

      return;
    }

    createEventMutation.mutate(formData, {
      onSuccess: () => {
        resetDialogState();
      },
    });
  };

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load calendar.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      </div>

      <EventDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setEditingEvent(null);
            setSelectedDate(null);
          }
        }}
        selectedDate={selectedDate}
        initialData={editingEvent}
        onSubmit={handleSubmit}
        onDelete={() => {
          setDialogOpen(false);
          setDeleteDialogOpen(true);
        }}
        isLoading={
          createEventMutation.isPending ||
          updateEventMutation.isPending
        }
      />

      <DeleteEventDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        event={editingEvent}
        onDeleted={resetDialogState}
      />
    </>
  );
}

export default CalendarPage;