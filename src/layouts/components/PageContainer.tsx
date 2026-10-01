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
      {/* Breadcrumb bar */}
      <div className="border-b border-gray-100 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Page content */}
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};