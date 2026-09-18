import { ChevronDown, User } from "lucide-react";

export const UserMenu = () => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5e94db]/10 text-[#5e94db]">
        <User size={18} />
      </div>

      <div className="hidden text-left md:block">
        <p className="text-sm font-medium text-slate-900">
          Supreme Admin
        </p>

        <p className="text-xs text-slate-500">
          Administrator
        </p>
      </div>

      <ChevronDown
        size={16}
        className="hidden text-slate-400 md:block"
      />
    </button>
  );
};