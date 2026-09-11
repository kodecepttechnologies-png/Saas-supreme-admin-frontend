import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";
import type { LoginRequest } from "../types/auth.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
  });
};