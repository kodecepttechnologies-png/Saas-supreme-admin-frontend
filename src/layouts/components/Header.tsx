import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Bell,
  Building2,
  Check,
  CheckCheck,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { UserMenu } from "./UserMenu";
import { useTheme } from "../../lib/theme/ThemeContext";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import type { BackendNotification } from "../../features/notifications/types/notification.types";

interface HeaderProps {
  onMenuClick: () => void;
}

// ─── UI notification shape ────────────────────────────────────────────────────

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  /** Local-only unread flag — mark-as-read is UI state; no backend endpoint */
  unread: boolean;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Pick an icon based on the notification `type` field from the backend */
function iconForType(
  type?: string,
): React.ComponentType<{ size?: number; strokeWidth?: number }> {
  switch ((type ?? "").toLowerCase()) {
    case "organization":
    case "org":
      return Building2;
    default:
      return Bell;
  }
}

/** Convert an ISO timestamp from the backend into a human-readable relative label */
function formatRelativeTime(iso?: string): string {
  if (!iso) return "Recently";
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60_000);
    if (min < 1) return "Just now";
    if (min < 60) return `${min}m ago`;
    const h = Math.floor(min / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  } catch {
    return "Recently";
  }
}

/** Normalise the flexible backend response into a plain array */
function extractRaw(
  data: BackendNotification[] | { notifications: BackendNotification[]; [k: string]: unknown },
): BackendNotification[] {
  if (Array.isArray(data)) return data;
  if (data && "notifications" in data && Array.isArray(data.notifications)) {
    return data.notifications;
  }
  return [];
}

/** Map one backend record → UI NotificationItem */
function mapNotification(n: BackendNotification): NotificationItem {
  return {
    id: n.id ?? n._id ?? String(Math.random()),
    title: n.title ?? "Notification",
    description: n.message ?? n.description ?? "",
    time: formatRelativeTime(n.createdAt),
    // Treat as unread unless backend explicitly marks it read
    unread: n.isRead === false || n.read === false || (n.isRead === undefined && n.read === undefined),
    icon: iconForType(n.type),
  };
}

// ─── Notification Popover ─────────────────────────────────────────────────────

interface NotificationPopoverProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  notifications: NotificationItem[];
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationPopover = ({
  anchorRef,
  notifications,
  isLoading,
  isError,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [anchorRef, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleViewAll = () => {
    onClose();
    navigate("/notifications");
  };

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-full mt-2 z-50 flex flex-col rounded-2xl border border-gray-200 bg-white"
      style={{
        width: "min(380px, calc(100vw - 2rem))",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-900">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white leading-none">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              aria-label="Mark all notifications as read"
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
            >
              <CheckCheck size={13} />
              <span>Mark all read</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxHeight: 320, overflowY: "auto" }}>
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-3 px-5 py-5">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-gray-100" />
                  <div className="h-2.5 w-full rounded bg-gray-100" />
                  <div className="h-2 w-1/3 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center px-5 py-8 text-center">
            <Bell size={24} className="mb-2 text-gray-300" />
            <p className="text-sm text-gray-500">
              Could not load notifications.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-8 text-center">
            <Bell size={24} className="mb-2 text-gray-300" />
            <p className="text-sm text-gray-500">No notifications yet.</p>
          </div>
        )}

        {/* List */}
        {!isLoading && !isError && notifications.length > 0 && (
          <ul className="divide-y divide-gray-50">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <li
                  key={notification.id}
                  className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 leading-snug">
                        {notification.title}
                      </p>

                      {notification.unread ? (
                        <div className="flex shrink-0 items-center mt-0.5">
                          {/* Default: blue dot */}
                          <span className="group-hover:hidden h-2 w-2 rounded-full bg-indigo-500" />
                          {/* On hover: checkmark button */}
                          <button
                            type="button"
                            onClick={() => onMarkAsRead(notification.id)}
                            aria-label={`Mark "${notification.title}" as read`}
                            title="Mark as read"
                            className="hidden group-hover:flex h-5 w-5 items-center justify-center rounded text-indigo-500 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
                          >
                            <Check size={12} />
                          </button>
                        </div>
                      ) : (
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-gray-300">
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-100 px-5 py-3">
        <button
          type="button"
          onClick={handleViewAll}
          className="w-full rounded-xl py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  // Prevent the API response from overwriting local mark-as-read state
  const [hasSynced, setHasSynced] = useState(false);

  const bellRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

  const { data: fetchedData, isLoading, isError } = useNotifications();

  // Sync API data into local state once on first successful fetch
  useEffect(() => {
    if (fetchedData?.data && !hasSynced) {
      const raw = extractRaw(fetchedData.data);
      setNotifications(raw.map(mapNotification));
      setHasSynced(true);
    }
  }, [fetchedData, hasSynced]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleBellClick = useCallback(() => {
    setIsNotifOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsNotifOpen(false);
  }, []);

  // Mark-as-read is local UI state only — no backend endpoint exists for it
  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
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
          <p className="text-xs text-gray-500">Platform Administration</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            ref={bellRef}
            type="button"
            aria-label="Notifications"
            aria-haspopup="dialog"
            aria-expanded={isNotifOpen}
            onClick={handleBellClick}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
          >
            <Bell size={20} />

            {/* Unread dot — visible while loading too (optimistic) */}
            {(isLoading || unreadCount > 0) && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {isNotifOpen && (
            <NotificationPopover
              anchorRef={bellRef}
              notifications={notifications}
              isLoading={isLoading}
              isError={isError}
              onClose={handleClose}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}
        </div>

        <UserMenu />
      </div>
    </header>
  );
};