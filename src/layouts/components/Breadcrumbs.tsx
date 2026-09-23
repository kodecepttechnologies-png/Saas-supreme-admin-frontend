import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  organizations: "Organizations",
  notifications: "Notifications",
  settings: "Settings",
  profile: "Profile",
};

export const Breadcrumbs = () => {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm"
    >
      <Link
        to="/dashboard"
        className="text-slate-500 hover:text-[#5e94db]"
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <div
            key={`${segment}-${index}`}
            className="flex items-center gap-2"
          >
            <ChevronRight
              size={15}
              className="text-slate-400"
            />

            <span
              className={
                isLast
                  ? "font-medium text-slate-900"
                  : "text-slate-500"
              }
            >
              {routeLabels[segment] ?? segment}
            </span>
          </div>
        );
      })}
    </nav>
  );
};