import type { ReactNode } from "react";

import { Breadcrumbs } from "./Breadcrumbs";

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({
  children,
}: PageContainerProps) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-6">
        <Breadcrumbs />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};