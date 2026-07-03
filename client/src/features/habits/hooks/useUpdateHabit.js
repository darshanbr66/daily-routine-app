import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateHabit } from "../api/habit.api";

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      toast.success("Habit updated successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update habit"
      );
    },
  });
};