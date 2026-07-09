import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { updateRoutine } from "../api/routine.api";

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoutine,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });

      toast.success(
        response.message ||
          "Routine updated successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update routine."
      );
    },
  });
};