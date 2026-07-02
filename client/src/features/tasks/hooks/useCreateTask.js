import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createTask } from "../api/task.api";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });

      toast.success("Task created successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create task."
      );
    },
  });
};