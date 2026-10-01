import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success", duration = 3500) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, variant, duration }]);
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Single Toast Message ─────────────────────────────────────────────────────

const variantConfig: Record<
  ToastVariant,
  { icon: ReactNode; borderColor: string; iconColor: string }
> = {
  success: {
    icon: <CheckCircle size={18} />,
    borderColor: "#16a34a",
    iconColor: "#16a34a",
  },
  error: {
    icon: <AlertCircle size={18} />,
    borderColor: "#dc2626",
    iconColor: "#dc2626",
  },
  info: {
    icon: <Info size={18} />,
    borderColor: "#6366F1",
    iconColor: "#6366F1",
  },
};

const ToastMessage = ({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) => {
  const { id, message, variant = "success", duration = 3500 } = toast;
  const config = variantConfig[variant];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, duration, onDismiss]);

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-start gap-3 rounded-xl border bg-white px-4 py-3"
      style={{
        borderLeft: `4px solid ${config.borderColor}`,
        minWidth: 280,
        maxWidth: 380,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <span style={{ color: config.iconColor, flexShrink: 0, marginTop: 1 }}>
        {config.icon}
      </span>

      <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(id)}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
