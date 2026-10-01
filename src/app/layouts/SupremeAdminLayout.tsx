import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { authApi } from "../../features/auth/api/auth.api";
import { useAuth } from "../../features/auth/hooks/AuthContext";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";

import {
  Footer,
  Header,
  MobileSidebar,
  PageContainer,
  Sidebar,
} from "../../layouts";

export const SupremeAdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const { showToast } = useToast();

  /** Opens the confirmation dialog — does NOT immediately log out */
  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  /** Called when user confirms logout */
  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      clearAuth();
      navigate("/supreme-admin/login");
      showToast("Logged out successfully", "success");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local auth and redirect even if backend fails
      clearAuth();
      navigate("/supreme-admin/login");
      showToast(
        "Logged out locally. Server logout could not be completed.",
        "info",
      );
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const handleLogoutCancel = () => {
    if (!isLoggingOut) setIsLogoutModalOpen(false);
  };

  return (
    <>
      {/* ─── Outer shell: sidebar + main side by side ─── */}
      <div className="flex h-screen overflow-hidden bg-[#F5F6FA]">
        {/* Desktop Sidebar — fixed height = 100vh via h-screen on parent */}
        <Sidebar onLogout={handleLogoutRequest} />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onLogout={handleLogoutRequest}
        />

        {/* Main column — scrolls independently */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

          <PageContainer>
            <Outlet />
          </PageContainer>

          <Footer />
        </div>
      </div>

      {/* ─── Logout confirmation modal ─── */}
      <Modal
        open={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        title="Logout"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleLogoutCancel}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              size="md"
              loading={isLoggingOut}
              onClick={handleLogoutConfirm}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to logout?
        </p>
      </Modal>
    </>
  );
};
