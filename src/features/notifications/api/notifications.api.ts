import { apiClient } from "../../../lib/api/client";
import type { NotificationsResponse } from "../types/notification.types";

export const notificationsApi = {
  /** GET /notifications — fetches all notifications for the current admin */
  getAll: async (): Promise<NotificationsResponse> => {
    const response =
      await apiClient.get<NotificationsResponse>("/notifications");
    return response.data;
  },
};
