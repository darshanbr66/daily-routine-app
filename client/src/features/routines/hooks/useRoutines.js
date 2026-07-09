import { useQuery } from "@tanstack/react-query";

import { getRoutines } from "../api/routine.api";

export const useRoutines = ({
  search = "",
  timeOfDay = "",
  isActive = "",
} = {}) => {
  return useQuery({
    queryKey: [
      "routines",
      search,
      timeOfDay,
      isActive,
    ],

    queryFn: () =>
      getRoutines({
        search,
        timeOfDay,
        isActive,
      }),

    staleTime: 1000 * 60 * 5,

    placeholderData: (previousData) =>
      previousData,
  });
};