import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteNote } from "../api/note.api";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      toast.success(
        response.message ||
          "Note deleted successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete note."
      );
    },
  });
};