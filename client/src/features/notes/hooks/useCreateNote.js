import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createNote } from "../api/note.api";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      toast.success(
        response.message ||
          "Note created successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create note."
      );
    },
  });
};