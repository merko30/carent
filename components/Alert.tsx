import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const VARIANTS = {
  error: "bg-red-100 border-red-700 text-red-700",
  success: "bg-green-100 border-green-700 text-green-700",
  warning: "bg-yellow-100 border-yellow-700 text-yellow-700",
  info: "bg-blue-100 border-blue-700 text-blue-700",
} as const;

type Variant = keyof typeof VARIANTS;

interface AlertProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Alert({
  children,
  variant = "info",
  className,
}: AlertProps) {
  return (
    <div
      className={twMerge(
        "px-3 py-2 rounded-sm border mb-4",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
