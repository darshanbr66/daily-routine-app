import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../api/note.api";

export const useNotes = ({
  search = "",
  category = "",
  isPinned = "",
} = {}) => {
  return useQuery({
    queryKey: [
      "notes",
      search,
      category,
      isPinned,
    ],

    queryFn: () =>
      getNotes({
        search,
        category,
        isPinned,
      }),

    staleTime: 1000 * 60 * 5,
  });
};