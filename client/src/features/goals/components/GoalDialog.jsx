import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import GoalForm from "./GoalForm";

import { useCreateGoal } from "../hooks/useCreateGoal";
import { useUpdateGoal } from "../hooks/useUpdateGoal";

function GoalDialog({
  open,
  onOpenChange,
  goal = null,
}) {
  const createGoalMutation = useCreateGoal();
  const updateGoalMutation = useUpdateGoal();

  const isEditing = !!goal;

  const defaultValues = {
    title: goal?.title || "",
    description: goal?.description || "",
    category: goal?.category || "Personal",
    priority: goal?.priority || "medium",
    status: goal?.status || "not-started",
    progress: goal?.progress ?? 0,
    targetDate: goal?.targetDate
      ? goal.targetDate.split("T")[0]
      : "",
    color: goal?.color || "#4F46E5",
    icon: goal?.icon || "🎯",
  };

  const handleSubmit = (data) => {
    if (isEditing) {
      updateGoalMutation.mutate(
        {
          id: goal._id,
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

    createGoalMutation.mutate(data, {
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Goal"
              : "Create Goal"}
          </DialogTitle>
        </DialogHeader>

        <GoalForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitText={
            isEditing
              ? "Update Goal"
              : "Create Goal"
          }
          isLoading={
            createGoalMutation.isPending ||
            updateGoalMutation.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default GoalDialog;