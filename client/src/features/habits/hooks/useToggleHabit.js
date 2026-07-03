import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { toggleHabit } from "../api/habit.api";

export const useToggleHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleHabit,

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