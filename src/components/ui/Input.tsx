import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      leftAddon,
      rightAddon,
      id,
      required,
      className = "",
      disabled,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseClass =
      "w-full rounded-xl border bg-white py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

    const stateClass = error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20";

    const paddingClass = [
      leftAddon ? "pl-10" : "pl-3.5",
      rightAddon ? "pr-10" : "pr-3.5",
    ].join(" ");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
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
          {leftAddon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            className={[baseClass, stateClass, paddingClass, className]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          />

          {rightAddon && (
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {rightAddon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        {!error && helper && (
          <p id={`${inputId}-helper`} className="text-xs text-gray-500">
            {helper}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
