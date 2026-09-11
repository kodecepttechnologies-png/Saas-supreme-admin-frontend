import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authApi } from "../api/auth.api";
import { authStorage } from "../../../lib/auth/authStorage";

import type {
  AuthState,
  AuthUser,
} from "../types/auth.types";

interface AuthContextValue extends AuthState {
  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUserState] = useState<AuthUser | null>(
    authStorage.getUser(),
  );

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await authApi.getCurrentUser();

        setUserState(response.user);
        authStorage.setUser(response.user);
      } catch {
        authStorage.clear();
        setUserState(null);
      }
    };

    restoreSession();
  }, []);

  const setUser = (newUser: AuthUser) => {
    setUserState(newUser);
    authStorage.setUser(newUser);
  };

  const clearAuth = () => {
    setUserState(null);
    authStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        setUser,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
};