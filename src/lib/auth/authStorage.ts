import type { AuthUser } from "../../features/auth/types/auth.types";
const USER_KEY = "supreme_admin_user";

export const authStorage = {
  getUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as AuthUser;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  setUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear(): void {
    localStorage.removeItem(USER_KEY);
  },
};