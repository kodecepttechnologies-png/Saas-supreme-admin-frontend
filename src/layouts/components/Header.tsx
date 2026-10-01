import { Bell, Menu } from "lucide-react";

import { UserMenu } from "./UserMenu";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            Supreme Admin Panel
          </p>

          <p className="text-xs text-gray-500">
            Platform Administration
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
        >
          <Bell size={20} />

          {/* Temporary unread indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
};