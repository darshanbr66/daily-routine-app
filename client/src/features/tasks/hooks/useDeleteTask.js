import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteTask } from "../api/task.api";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });

      toast.success("Task deleted successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete task."
      );
    },
  });
};