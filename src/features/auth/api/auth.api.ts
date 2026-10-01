import { apiClient } from "../../../lib/api/client";

import type { AuthResponse, LoginRequest } from "../types/auth.types";

export const authApi = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/login", payload);

    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/logout");
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>("/profile");

    return response.data;
  },
};
