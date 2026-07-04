import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateGoal } from "../api/goal.api";

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGoal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      toast.success("Goal updated successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update goal"
      );
    },
  });
};