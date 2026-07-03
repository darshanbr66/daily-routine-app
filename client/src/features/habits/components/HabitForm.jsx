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

function HabitForm({
  defaultValues = {
    title: "",
    description: "",
    category: "Personal",
    reminderTime: "",
    color: "#4F46E5",
    icon: "⭐",
  },
  onSubmit,
  isLoading = false,
  submitText = "Create Habit",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Habit Title</Label>

        <Input
          id="title"
          placeholder="Drink 3L Water"
          {...register("title", {
            required: "Habit title is required",
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
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          rows={4}
          placeholder="Habit description"
          {...register("description")}
        />
      </div>

      {/* Category */}
      <div>
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
            <SelectItem value="Health">
              Health
            </SelectItem>

            <SelectItem value="Fitness">
              Fitness
            </SelectItem>

            <SelectItem value="Learning">
              Learning
            </SelectItem>

            <SelectItem value="Career">
              Career
            </SelectItem>

            <SelectItem value="Finance">
              Finance
            </SelectItem>

            <SelectItem value="Personal">
              Personal
            </SelectItem>

            <SelectItem value="Other">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reminder */}
      <div>
        <Label htmlFor="reminderTime">
          Reminder Time
        </Label>

        <Input
          id="reminderTime"
          type="time"
          {...register("reminderTime")}
        />
      </div>

      {/* Color */}
      <div>
        <Label htmlFor="color">Color</Label>

        <Input
          id="color"
          type="color"
          {...register("color")}
          className="h-12"
        />
      </div>

      {/* Icon */}
      <div>
        <Label htmlFor="icon">Icon</Label>

        <Input
          id="icon"
          maxLength={2}
          placeholder="⭐"
          {...register("icon")}
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

export default HabitForm;