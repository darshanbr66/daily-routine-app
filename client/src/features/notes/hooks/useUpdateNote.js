import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateNote } from "../api/note.api";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      toast.success(
        response.message ||
          "Note updated successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update note."
      );
    },
  });
};