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
      className="flex items-center gap-1.5 text-sm"
    >
      <Link
        to="/dashboard"
        className="text-gray-500 transition-colors duration-150 hover:text-indigo-600"
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <div
            key={`${segment}-${index}`}
            className="flex items-center gap-1.5"
          >
            <ChevronRight
              size={14}
              className="shrink-0 text-gray-300"
            />

            <span
              className={
                isLast
                  ? "font-medium text-gray-900"
                  : "text-gray-500"
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