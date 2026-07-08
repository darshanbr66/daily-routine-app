import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateEvent } from "../api/calendar.api";

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast.success(
        response.message || "Event updated successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update event."
      );
    },
  });
};