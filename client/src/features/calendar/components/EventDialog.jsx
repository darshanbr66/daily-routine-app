import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { eventSchema } from "../schemas/event.schema";

function EventDialog({
  open,
  onOpenChange,
  selectedDate,
  initialData = null,
  onSubmit,
  onDelete,
  isLoading = false,
}) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "personal",
      priority: "medium",
      color: "#3B82F6",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        date: initialData.date?.split("T")[0] ?? "",
        startTime: initialData.startTime ?? "",
        endTime: initialData.endTime ?? "",
        type: initialData.type ?? "personal",
        priority: initialData.priority ?? "medium",
        color: initialData.color ?? "#3B82F6",
      });

      return;
    }

    reset({
      title: "",
      description: "",
      date: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "",
      startTime: "",
      endTime: "",
      type: "personal",
      priority: "medium",
      color: "#3B82F6",
    });
  }, [initialData, selectedDate, reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Event"
              : "Create Event"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Title */}

          <div>
            <Input
              placeholder="Event title"
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <Textarea
              rows={3}
              placeholder="Description"
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date */}

          <div>
            <Input
              type="date"
              {...register("date")}
            />

            {errors.date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Time */}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="time"
                {...register("startTime")}
              />
            </div>

            <div>
              <Input
                type="time"
                {...register("endTime")}
              />

              {errors.endTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Type */}

          <select
            className="h-10 w-full rounded-md border px-3"
            {...register("type")}
          >
            <option value="personal">
              Personal
            </option>
            <option value="work">
              Work
            </option>
            <option value="meeting">
              Meeting
            </option>
            <option value="reminder">
              Reminder
            </option>
            <option value="task">
              Task
            </option>
            <option value="habit">
              Habit
            </option>
            <option value="goal">
              Goal
            </option>
          </select>

          {/* Priority */}

          <select
            className="h-10 w-full rounded-md border px-3"
            {...register("priority")}
          >
            <option value="low">
              Low
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="high">
              High
            </option>
          </select>

          {/* Color */}

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">
              Color
            </label>

            <Input
              type="color"
              className="h-10 w-20 p-1"
              {...register("color")}
            />
          </div>

          {/* Footer */}

          <div className="flex items-center justify-between pt-2">
            <div>
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
              >
                {isEditing
                  ? "Update Event"
                  : "Create Event"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;