import type { ReactNode } from "react";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "../../features/auth";
import { ToastProvider } from "../../components/ui/Toast";
import { ThemeProvider } from "../../lib/theme/ThemeContext";


interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({
  children,
}: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};