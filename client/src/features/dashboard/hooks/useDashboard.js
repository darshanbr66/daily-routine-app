import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
};