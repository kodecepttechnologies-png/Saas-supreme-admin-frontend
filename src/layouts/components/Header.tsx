import { Bell, Menu } from "lucide-react";

import { UserMenu } from "./UserMenu";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-900">
            Supreme Admin Panel
          </p>

          <p className="text-xs text-slate-500">
            Platform Administration
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Bell size={20} />

          {/* Temporary unread indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#DBA55E]" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
};