import { useQuery } from "@tanstack/react-query";

import { notificationsApi } from "../api/notifications.api";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: notificationsApi.getAll,
    staleTime: 30_000, // treat data as fresh for 30 s
    retry: 1, // one retry on network failure
    refetchOnWindowFocus: false, // don't overwrite local mark-as-read state
  });
};
