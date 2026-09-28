import { apiClient } from "../../../lib/api/client";

import type { DashboardResponse } from "../types/dashboard.types";

export const dashboardApi = {
  getDashboardStats: async (): Promise<DashboardResponse> => {
    const response = await apiClient.get<DashboardResponse>(
      "/dashboard",
    );

    return response.data;
  },
};