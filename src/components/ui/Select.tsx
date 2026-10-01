import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helper,
      options = [],
      placeholder,
      id,
      required,
      disabled,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseClass =
      "w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 pr-9";

    const stateClass = error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${selectId}-error` : helper ? `${selectId}-helper` : undefined
            }
            className={[baseClass, stateClass, className].filter(Boolean).join(" ")}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom chevron */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>

        {error && (
          <p id={`${selectId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        {!error && helper && (
          <p id={`${selectId}-helper`} className="text-xs text-gray-500">
            {helper}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
