import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TaskForm from "./TaskForm";

import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

function TaskDialog({
  open,
  onOpenChange,
  task = null,
}) {
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const handleSubmit = (data) => {
    if (task) {
      updateTaskMutation.mutate(
        {
          id: task._id,
          data,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createTaskMutation.mutate(data, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <TaskForm
          defaultValues={{
            title: task?.title || "",
            description: task?.description || "",
            priority: task?.priority || "medium",
            dueDate: task?.dueDate
              ? task.dueDate.split("T")[0]
              : "",
          }}
          onSubmit={handleSubmit}
          isLoading={
            createTaskMutation.isPending ||
            updateTaskMutation.isPending
          }
          submitText={
            task ? "Update Task" : "Create Task"
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default TaskDialog;