import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helper,
      id,
      required,
      disabled,
      className = "",
      rows = 4,
      ...rest
    },
    ref,
  ) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseClass =
      "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 resize-y disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

    const stateClass = error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helper
                ? `${textareaId}-helper`
                : undefined
          }
          className={[baseClass, stateClass, className].filter(Boolean).join(" ")}
          {...rest}
        />

        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        {!error && helper && (
          <p id={`${textareaId}-helper`} className="text-xs text-gray-500">
            {helper}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
