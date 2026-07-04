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

function GoalForm({
  defaultValues = {
    title: "",
    description: "",
    category: "Personal",
    priority: "medium",
    status: "not-started",
    progress: 0,
    targetDate: "",
    color: "#4F46E5",
    icon: "🎯",
  },
  onSubmit,
  isLoading = false,
  submitText = "Create Goal",
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

  const category = watch("category");
  const priority = watch("priority");
  const status = watch("status");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Goal Title</Label>

        <Input
          id="title"
          placeholder="Build Daily Routine App"
          {...register("title", {
            required: "Goal title is required",
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
          placeholder="Describe your goal..."
          {...register("description")}
        />
      </div>

      {/* Row 1 */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>

          <Select
            value={category}
            onValueChange={(value) =>
              setValue("category", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Career">
                Career
              </SelectItem>

              <SelectItem value="Health">
                Health
              </SelectItem>

              <SelectItem value="Fitness">
                Fitness
              </SelectItem>

              <SelectItem value="Learning">
                Learning
              </SelectItem>

              <SelectItem value="Finance">
                Finance
              </SelectItem>

              <SelectItem value="Personal">
                Personal
              </SelectItem>

              <SelectItem value="Business">
                Business
              </SelectItem>

              <SelectItem value="Travel">
                Travel
              </SelectItem>

              <SelectItem value="Other">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>

          <Select
            value={priority}
            onValueChange={(value) =>
              setValue("priority", value)
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
      </div>

      {/* Row 2 */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Status</Label>

          <Select
            value={status}
            onValueChange={(value) =>
              setValue("status", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="not-started">
                Not Started
              </SelectItem>

              <SelectItem value="in-progress">
                In Progress
              </SelectItem>

              <SelectItem value="completed">
                Completed
              </SelectItem>

              <SelectItem value="on-hold">
                On Hold
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="progress">
            Progress (%)
          </Label>

          <Input
            id="progress"
            type="number"
            min={0}
            max={100}
            placeholder="0"
            {...register("progress", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="targetDate">
            Target Date
          </Label>

          <Input
            id="targetDate"
            type="date"
            {...register("targetDate")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">
            Goal Color
          </Label>

          <Input
            id="color"
            type="color"
            className="h-11 w-24 cursor-pointer p-1"
            {...register("color")}
          />
        </div>
      </div>

      {/* Icon */}
      <div className="space-y-2">
        <Label htmlFor="icon">Icon</Label>

        <Input
          id="icon"
          maxLength={2}
          placeholder="🎯"
          {...register("icon")}
        />
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

export default GoalForm;