import { ChevronDown, User } from "lucide-react";

export const UserMenu = () => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-gray-50"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <User size={18} />
      </div>

      <div className="hidden text-left md:block">
        <p className="text-sm font-medium text-gray-900">
          Supreme Admin
        </p>

        <p className="text-xs text-gray-500">
          Administrator
        </p>
      </div>

      <ChevronDown
        size={16}
        className="hidden text-gray-400 md:block"
      />
    </button>
  );
};