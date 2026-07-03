import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createHabit } from "../api/habit.api";

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      toast.success("Habit created successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create habit"
      );
    },
  });
};