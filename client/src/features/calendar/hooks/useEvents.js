import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api/calendar.api";

export const useEvents = ({
  search = "",
  type = "",
  startDate = "",
  endDate = "",
  sort = "date",
} = {}) => {
  return useQuery({
    queryKey: [
      "events",
      search,
      type,
      startDate,
      endDate,
      sort,
    ],

    queryFn: () =>
      getEvents({
        search,
        type,
        startDate,
        endDate,
        sort,
      }),

    staleTime: 1000 * 60 * 5,
  });
};