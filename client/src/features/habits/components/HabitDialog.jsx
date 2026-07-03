import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import HabitForm from "./HabitForm";

import { useCreateHabit } from "../hooks/useCreateHabit";
import { useUpdateHabit } from "../hooks/useUpdateHabit";

function HabitDialog({
  open,
  onOpenChange,
  habit = null,
}) {
  const createHabitMutation = useCreateHabit();
  const updateHabitMutation = useUpdateHabit();

  const isEditing = !!habit;

  const defaultValues = {
    title: habit?.title || "",
    description: habit?.description || "",
    category: habit?.category || "Personal",
    reminderTime: habit?.reminderTime || "",
    color: habit?.color || "#4F46E5",
    icon: habit?.icon || "⭐",
  };

  const handleSubmit = (data) => {
    if (isEditing) {
      updateHabitMutation.mutate(
        {
          id: habit._id,
          data,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );

      return;
    }

    createHabitMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Habit"
              : "Create Habit"}
          </DialogTitle>
        </DialogHeader>

        <HabitForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitText={
            isEditing
              ? "Update Habit"
              : "Create Habit"
          }
          isLoading={
            createHabitMutation.isPending ||
            updateHabitMutation.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default HabitDialog;