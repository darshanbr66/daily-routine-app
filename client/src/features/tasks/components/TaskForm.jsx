import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>

        <Input
          id="title"
          placeholder="Enter task title"
          {...register("title", {
            required: "Title is required",
          })}
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          rows={4}
          placeholder="Task description"
          {...register("description")}
        />
      </div>

      {/* Priority */}
      <div>
        <Label htmlFor="priority">Priority</Label>

        <select
          id="priority"
          {...register("priority")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <Label htmlFor="dueDate">Due Date</Label>

        <Input
          id="dueDate"
          type="date"
          {...register("dueDate")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : submitText}
      </Button>
    </form>
  );
}

export default TaskForm;