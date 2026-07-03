import { useQuery } from "@tanstack/react-query";

import { getHabits } from "../api/habit.api";

export const useHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  });
};