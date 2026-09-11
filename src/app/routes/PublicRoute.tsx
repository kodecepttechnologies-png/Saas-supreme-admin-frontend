import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/AuthContext";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};