import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";
import type { RegisterRequest } from "../types/auth.types";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
  });
};