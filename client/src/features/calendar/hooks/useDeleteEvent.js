import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteEvent } from "../api/calendar.api";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast.success(
        response.message || "Event deleted successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete event."
      );
    },
  });
};