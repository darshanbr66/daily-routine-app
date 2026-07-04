import { useQuery } from "@tanstack/react-query";

import { getGoals } from "../api/goal.api";

export const useGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
  });
};