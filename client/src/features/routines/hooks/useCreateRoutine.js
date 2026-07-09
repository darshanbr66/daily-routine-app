import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { createRoutine } from "../api/routine.api";

export const useCreateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoutine,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });

      toast.success(
        response.message ||
          "Routine created successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create routine."
      );
    },
  });
};