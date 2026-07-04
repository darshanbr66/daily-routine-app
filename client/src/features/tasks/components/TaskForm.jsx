import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TaskForm({
  defaultValues = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  },
  onSubmit,
  isLoading = false,
  submitText = "Create Task",
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const priority = watch("priority");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Task Title
        </Label>

        <Input
          id="title"
          placeholder="Complete React Project"
          {...register("title", {
            required:
              "Task title is required",
          })}
        />

        {errors.title && (
          <p className="text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          rows={4}
          placeholder="Describe your task..."
          {...register("description")}
        />
      </div>

      {/* Row */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Priority</Label>

          <Select
            value={priority}
            onValueChange={(value) =>
              setValue(
                "priority",
                value
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="low">
                Low
              </SelectItem>

              <SelectItem value="medium">
                Medium
              </SelectItem>

              <SelectItem value="high">
                High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">
            Due Date
          </Label>

          <Input
            id="dueDate"
            type="date"
            {...register("dueDate")}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end border-t pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-40"
        >
          {isLoading
            ? "Please wait..."
            : submitText}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;