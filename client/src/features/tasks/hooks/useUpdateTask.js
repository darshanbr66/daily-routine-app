import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTask } from "../api/task.api";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });

      toast.success("Task updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update task."
      );
    },
  });
};