import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteRoutine } from "../api/routine.api";

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoutine,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });

      toast.success(
        response.message ||
          "Routine deleted successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete routine."
      );
    },
  });
};