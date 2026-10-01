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
import Logo1 from "../../assets/workfonow logo 1.svg";

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
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-gray-100 bg-white lg:flex">      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-100 px-5">
        <div className="flex items-center gap-3">
          <img
            src={Logo1}
            alt="WorkForNow"
            className="h-8 w-8 rounded-lg shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              Supreme Admin
            </p>
            <p className="text-xs text-gray-500 leading-tight">
              Employee Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4"
        aria-label="Supreme Admin navigation"
      >
        <div className="space-y-0.5">
          {SUPREME_ADMIN_NAVIGATION.map((item) => {
            const Icon = navigationIcons[item.path];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
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
      <div className="mt-auto border-t border-gray-100 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};