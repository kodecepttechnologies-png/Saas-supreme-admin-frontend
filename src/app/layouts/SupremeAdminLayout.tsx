import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  Footer,
  Header,
  MobileSidebar,
  PageContainer,
  Sidebar,
} from "../../layouts";
export const SupremeAdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar onLogout={handleLogout} />

        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onMenuClick={() => setIsMobileSidebarOpen(true)}
          />

          <PageContainer>

            <Outlet />
          </PageContainer>
          <Footer />
        </div>
      </div>
    </div>
  );
};