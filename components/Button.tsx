import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-3",
  lg: "text-lg px-5 py-4",
};

export default function Button({
  children,
  className,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
