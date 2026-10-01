import {
  Bell,
  Building2,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { SUPREME_ADMIN_NAVIGATION } from"../../constants/route.constants";
import Logo1 from "../../assets/workfonow logo 1.svg";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navigationIcons = {
  "/dashboard": LayoutDashboard,
  "/organizations": Building2,
  "/notifications": Bell,
  "/settings": Settings,
  "/profile": User,
} as const;

export const MobileSidebar = ({
  isOpen,
  onClose,
  onLogout,
}: MobileSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl shadow-indigo-100/30 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <div className="flex items-center gap-3">
            <img
              src={Logo1}
              alt="WorkForNow"
              className="h-8 w-8 rounded-lg shrink-0"
            />
            <p className="text-sm font-bold text-gray-900">
              Supreme Admin
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Mobile Supreme Admin navigation"
        >
          <div className="space-y-0.5">
            {SUPREME_ADMIN_NAVIGATION.map((item) => {
              const Icon = navigationIcons[item.path];

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    ].join(" ")
                  }
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};