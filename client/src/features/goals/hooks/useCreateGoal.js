import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createGoal } from "../api/goal.api";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGoal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      toast.success("Goal created successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create goal"
      );
    },
  });
};