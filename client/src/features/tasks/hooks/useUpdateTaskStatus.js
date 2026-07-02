import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTaskStatus } from "../api/task.api";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });

      if (variables.status === "completed") {
        toast.success("Task marked as completed.");
      } else {
        toast.success("Task marked as todo.");
      }
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update task status."
      );
    },
  });
};