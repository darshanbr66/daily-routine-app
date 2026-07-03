import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteHabit } from "../api/habit.api";

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      toast.success("Habit deleted successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete habit"
      );
    },
  });
};