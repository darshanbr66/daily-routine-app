import { useEffect } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
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

import { routineSchema } from "../schemas/routine.schema";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function RoutineDialog({
  open,
  onOpenChange,
  initialData = null,
  onSubmit,
  onDelete,
  isLoading = false,
}) {
  const isEditing = Boolean(initialData);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(routineSchema),

    defaultValues: {
      name: "",
      description: "",
      icon: "Circle",
      color: "#3B82F6",
      timeOfDay: "morning",
      repeatDays: [],
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        description:
          initialData.description ?? "",
        icon: initialData.icon ?? "Circle",
        color:
          initialData.color ?? "#3B82F6",
        timeOfDay:
          initialData.timeOfDay ??
          "morning",
        repeatDays:
          initialData.repeatDays ?? [],
        isActive:
          initialData.isActive ?? true,
      });

      return;
    }

    reset({
      name: "",
      description: "",
      icon: "Circle",
      color: "#3B82F6",
      timeOfDay: "morning",
      repeatDays: [],
      isActive: true,
    });
  }, [initialData, reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Routine"
              : "Create Routine"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}

          <div>
            <Input
              placeholder="Routine name"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <Textarea
              rows={4}
              placeholder="Description"
              {...register(
                "description"
              )}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description
                  .message}
              </p>
            )}
          </div>

          {/* Icon */}

          <Input
            placeholder="Icon (Sun, Moon, Book...)"
            {...register("icon")}
          />

          {/* Time */}

          <select
            className="h-10 w-full rounded-md border px-3"
            {...register("timeOfDay")}
          >
            <option value="morning">
              Morning
            </option>

            <option value="afternoon">
              Afternoon
            </option>

            <option value="evening">
              Evening
            </option>

            <option value="night">
              Night
            </option>

            <option value="custom">
              Custom
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

          {/* Repeat Days */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Repeat Days
            </p>

            <Controller
              control={control}
              name="repeatDays"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DAYS.map((day) => (
                    <label
                      key={day}
                      className="flex items-center gap-2 rounded border p-2"
                    >
                      <input
                        type="checkbox"
                        checked={field.value.includes(
                          day
                        )}
                        onChange={(e) => {
                          if (
                            e.target.checked
                          ) {
                            field.onChange([
                              ...field.value,
                              day,
                            ]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (d) =>
                                  d !== day
                              )
                            );
                          }
                        }}
                      />

                      <span className="capitalize text-sm">
                        {day.slice(0, 3)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            />

            {errors.repeatDays && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors.repeatDays
                    .message
                }
              </p>
            )}
          </div>

          {/* Active */}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("isActive")}
            />

            Active Routine
          </label>

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
                  ? "Update Routine"
                  : "Create Routine"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RoutineDialog;