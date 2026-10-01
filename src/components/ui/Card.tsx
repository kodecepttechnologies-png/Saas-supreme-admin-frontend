import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Remove default padding */
  noPadding?: boolean;
}

export const Card = ({
  children,
  noPadding = false,
  className = "",
  ...rest
}: CardProps) => {
  return (
    <div
      className={[
        "rounded-2xl border border-gray-100 bg-white",
        "shadow-[0_10px_30px_rgba(99,102,241,0.08)]",
        noPadding ? "" : "p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};
