import {
  Bell,
  Building2,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { SUPREME_ADMIN_NAVIGATION } from "../../constants/route.constants";

interface SidebarProps {
  onLogout: () => void;
}

const navigationIcons = {
  "/dashboard": LayoutDashboard,
  "/organizations": Building2,
  "/notifications": Bell,
  "/settings": Settings,
  "/profile": User,
} as const;

export const Sidebar = ({ onLogout }: SidebarProps) => {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5e94db] text-sm font-bold text-white">
            S
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Supreme Admin
            </p>

            <p className="text-xs text-slate-500">
              Employee Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-5"
        aria-label="Supreme Admin navigation"
      >
        <div className="space-y-1">
          {SUPREME_ADMIN_NAVIGATION.map((item) => {
            const Icon = navigationIcons[item.path];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#5e94db]/10 text-[#5e94db]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon size={19} strokeWidth={1.8} />

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
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} strokeWidth={1.8} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};