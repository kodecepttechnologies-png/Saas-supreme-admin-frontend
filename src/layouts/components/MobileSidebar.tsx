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
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5e94db] text-sm font-bold text-white">
              S
            </div>

            <p className="text-sm font-bold text-slate-900">
              Supreme Admin
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5"
          aria-label="Mobile Supreme Admin navigation"
        >
          <div className="space-y-1">
            {SUPREME_ADMIN_NAVIGATION.map((item) => {
              const Icon = navigationIcons[item.path];

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                      isActive
                        ? "bg-[#5e94db]/10 text-[#5e94db]"
                        : "text-slate-600 hover:bg-slate-100",
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
        <div className="border-t border-slate-200 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};