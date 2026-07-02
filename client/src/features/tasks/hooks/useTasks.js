import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/task.api";

export const useTasks = ({
  search = "",
  status = "",
  priority = "",
  sort = "newest",
} = {}) => {
  return useQuery({
    queryKey: [
      "tasks",
      search,
      status,
      priority,
      sort,
    ],

    queryFn: () =>
      getTasks({
        search,
        status,
        priority,
        sort,
      }),

    staleTime: 1000 * 60 * 5,
  });
};