import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createEvent } from "../api/calendar.api";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast.success(
        response.message || "Event created successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create event."
      );
    },
  });
};